import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Order } from './entities/order.entity'

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<Order>) {}

  async getOrders() {
    return await this.OrderModel.find()
  }

  async getOrderById(id: string | Types.ObjectId) {
    const Order = await this.OrderModel.findById(id)
    if (!Order) {
      throw new NotFoundException('Order not found')
    }
    return Order
  }
}
