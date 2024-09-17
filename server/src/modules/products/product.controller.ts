import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AuthGuard } from 'guards/auth.guard'
import { Product } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { Inventory } from 'modules/stores/entities/inventory.entity'
import { Stock } from 'modules/stores/entities/stock.entity'
import { Roles } from 'decorators/roles.decorator'
import { UserRole } from 'modules/users/users.type'

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    @InjectModel(Stock.name) private StockModel: Model<Stock>,
  ) {}

  @Get()
  async getProducts() {
    return await this.productModel.find()
  }

  @Roles(UserRole.ADMIN)
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productModel.create(body)
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() body: Product) {
    return await this.productModel.findByIdAndUpdate(id, body, { new: true })
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productModel.findByIdAndDelete(id)
  }

  @Roles(UserRole.ADMIN)
  @Post(':id/add-inventory')
  async addInventory(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ) {
    const product = await this.productModel.findById(id)
    if (!product) throw new NotFoundException('Product not found')
    return await this.inventoryModel.findOneAndUpdate(
      { product: id },
      { $inc: { quantity } },
      { upsert: true, new: true },
    )
  }

  @Roles(UserRole.ADMIN)
  @Post(':id/remove-inventory')
  async removeInventory(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ) {
    const product = await this.productModel.findById(id)
    if (!product) throw new NotFoundException('Product not found')
    return await this.inventoryModel.findOneAndUpdate(
      { product: id },
      { $inc: { quantity: -quantity } },
      { upsert: true, new: true },
    )
  }

  @Roles(UserRole.ADMIN)
  @Post(':id/add-stock')
  async addStock(
    @Param('id') id: string,
    @Body() { store, quantity }: { store: string; quantity: number },
  ) {
    const product = await this.productModel.findById(id)
    if (!product) throw new NotFoundException('Product not found')
    return await this.StockModel.findOneAndUpdate(
      { product: id, store },
      { $inc: { quantity } },
      { upsert: true, new: true },
    )
  }

  @Roles(UserRole.ADMIN)
  @Post(':id/remove-stock')
  async removeStock(
    @Param('id') id: string,
    @Body() { store, quantity }: { store: string; quantity: number },
  ) {
    const product = await this.productModel.findById(id)
    if (!product) throw new NotFoundException('Product not found')
    return await this.StockModel.findOneAndUpdate(
      { product: id, store },
      { $inc: { quantity: -quantity } },
      { upsert: true, new: true },
    )
  }
}
