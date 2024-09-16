import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IProduct } from '../product.type'

export type ProductDocument = HydratedDocument<Product>

@Schema({ autoIndex: true, timestamps: true })
export class Product implements IProduct {
  _id?: Types.ObjectId

  @Prop({ type: String, index: true, required: true })
  name: string

  @Prop({ type: Number, default: 0 })
  price: number

  createdAt?: any
  updatedAt?: any
}

export const ProductSchema = SchemaFactory.createForClass(Product)
