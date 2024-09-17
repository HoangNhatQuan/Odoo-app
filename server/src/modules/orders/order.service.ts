import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Order } from './entities/order.entity'
import { AddItemDto } from './dto/add-item.dto'
import { RemoveItemDto } from './dto/remove-item.dto'
import { OrderItem } from './entities/order-items.entity'
import { Product } from 'modules/products/entities/product.entity'
import { User } from 'modules/users/entities/users.entity'
import { UserCategory } from 'modules/users/entities/user-category.entity'
import { Status } from './order.type'
import { Inventory } from 'modules/stores/entities/inventory.entity'
import { Store } from 'modules/stores/entities/store.entity'
import { Stock } from 'modules/stores/entities/stock.entity'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    @InjectModel(Store.name) private storeModel: Model<Store>,
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
    @InjectModel(UserCategory.name)
    private userCategoryModel: Model<UserCategory>,
    private readonly mailService: MailerService,
  ) {}

  async getOrders() {
    return await this.orderModel.find()
  }

  async getCreatedOrder(userId: string) {
    return await this.orderModel.findOne({
      customer: new Types.ObjectId(userId),
      status: 'Created',
    })
  }

  async getOrderById(orderId: string) {
    const Order = await this.orderModel.findById(orderId)
    if (!Order) throw new NotFoundException('Order not found')
    return Order
  }

  async addOrderItem(userId: string, body: AddItemDto) {
    const { product, quantity } = body
    const productExist = await this.productModel.findOne({ name: product })
    if (!productExist) throw new NotFoundException('Product not found')
    let order = await this.getCreatedOrder(userId)
    if (!order) {
      order = await this.orderModel.create({
        customer: new Types.ObjectId(userId),
        status: 'Created',
        orderItems: [],
      })
    }

    let orderItem = await this.orderItemModel.findOne({
      product: new Types.ObjectId(productExist._id),
      orderId: order._id,
    })

    if (orderItem) {
      orderItem.quantity += quantity
      await orderItem.save()
    } else {
      orderItem = await this.orderItemModel.create({
        product: new Types.ObjectId(productExist._id),
        orderId: order._id,
        quantity,
      })
    }

    const customer = await this.userModel.findById(userId)
    const category = await this.userCategoryModel.findById(customer.category)
    if (!customer) throw new NotFoundException('Customer not found')

    order.discount = Number(category.discount) * 100
    order.totalRawPrice += productExist.price * quantity
    order.totalPrice +=
      productExist.price * quantity * (1 - Number(category.discount))
    return order.save()
  }

  async removeOrderItem(userId: string, body: RemoveItemDto) {
    const { product, quantity } = body
    const productExist = await this.productModel.findOne({ name: product })
    if (!productExist) throw new NotFoundException('Product not found')
    const order = await this.getCreatedOrder(userId)
    if (!order) throw new NotFoundException('Order not found')

    const orderItem = await this.orderItemModel.findOne({
      product: new Types.ObjectId(productExist._id),
      orderId: order._id,
    })
    if (!orderItem) throw new NotFoundException('Order item not found')

    if (orderItem.quantity <= quantity) {
      await orderItem.deleteOne()
    } else {
      orderItem.quantity -= quantity
      await orderItem.save()
    }

    const customer = await this.userModel.findById(userId)
    const category = await this.userCategoryModel.findById(customer.category)
    if (!customer) throw new NotFoundException('Customer not found')

    order.discount = Number(category.discount) * 100
    order.totalRawPrice -= productExist.price * quantity
    order.totalPrice -=
      productExist.price * quantity * (1 - Number(category.discount))
    return order.save()
  }

  async verifyStock(orderItems: OrderItem[], store: string) {
    for (const item of orderItems) {
      const product = await this.productModel.findById(item.product)
      if (!product) throw new NotFoundException('Product not found')
      const stock = await this.stockModel.findOne({
        product: product._id,
        store: new Types.ObjectId(store),
      })
      if (!stock) throw new NotFoundException('Stock not found')
      if (stock.quantity < item.quantity) {
        const inventory = await this.inventoryModel.findOne({
          product: product._id,
        })
        if (!inventory) throw new NotFoundException('Inventory not found')
        if (inventory.quantity < item.quantity)
          throw new BadRequestException(`Not enough stock for ${product.name}`)
      }
    }
  }

  async verifyInventory(orderItems: OrderItem[]) {
    for (const item of orderItems) {
      const product = await this.productModel.findById(item.product)
      if (!product) throw new NotFoundException('Product not found')
      const inventory = await this.inventoryModel.findOne({
        product: product._id,
      })
      if (!inventory) throw new NotFoundException('Inventory not found')
      if (inventory.quantity < item.quantity)
        throw new BadRequestException(`Not enough for ${product.name}`)
    }
  }

  async checkoutOrder(userId: string, shippingOption: string, store = '') {
    const order = await this.getCreatedOrder(userId)
    const customer = await this.userModel.findById(userId)
    if (!order) throw new NotFoundException('Order not found')
    if (!shippingOption)
      throw new BadRequestException('Shipping option is required')

    const orderItems = await this.orderItemModel.find({
      orderId: order._id,
    })

    if (shippingOption === 'Free Shipping') {
      await this.verifyInventory(orderItems)
      this.mailService.sendMail({
        from: 'BSA <quan.hoang.kido1224@gmail.com>',
        to: customer.email,
        subject: `Order ${order._id} has been completed`,
        text: `Your order is on its way. Thank you for shopping with us!`,
      })
    } else {
      await this.verifyStock(orderItems, store)
      const findStore = await this.storeModel.findById(store)
      this.mailService.sendMail({
        from: 'BSA <quan.hoang.kido1224@gmail.com>',
        to: customer.email,
        subject: `Order ${order._id} has been completed`,
        text: `You can pick up your order at our store. Address: ${findStore.address}. Thank you for shopping with us!`,
      })
    }

    order.status = Status.COMPLETED
    return order.save()
  }

  async cancelOrder(userId: string) {
    const order = await this.getCreatedOrder(userId)
    if (!order) throw new NotFoundException('Order not found')
    const orderItems = await this.orderItemModel.find({
      orderId: order._id,
    })
    for (const item of orderItems) {
      await item.deleteOne()
    }
    order.status = Status.CANCELLED
    return order.save()
  }
}
