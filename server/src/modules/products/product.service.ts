import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Product } from './entities/product.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  async getProducts() {
    return await this.ProductModel.find()
  }

  async getProductById(id: string | Types.ObjectId) {
    const Product = await this.ProductModel.findById(id)
    if (!Product) {
      throw new NotFoundException('Product not found')
    }
    return Product
  }
}
