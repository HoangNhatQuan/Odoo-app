import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AuthGuard } from 'guards/auth.guard'
import { Product } from './entities/product.entity'

@UseGuards(AuthGuard)
@Controller('Products')
export class ProductController {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  @Get('/me')
  async find(@Req() req) {
    return await this.ProductModel.findById(req.ProductId).select('-password')
  }
}
