import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IStock } from '../store.type'
import { Product } from 'modules/products/entities/product.entity'
import { Store } from './store.entity'

export type StockDocument = HydratedDocument<Stock>

@Schema({ autoIndex: true, timestamps: true })
export class Stock implements IStock {
  _id?: Types.ObjectId

  @Prop({
    type: Types.ObjectId,
    index: true,
    required: true,
    ref: Product.name,
  })
  product: Types.ObjectId

  @Prop({ type: Number, default: 0 })
  quantity: number

  @Prop({
    type: Types.ObjectId,
    index: true,
    required: true,
    ref: Store.name,
  })
  store: Types.ObjectId

  createdAt?: any
  updatedAt?: any
}

export const StockSchema = SchemaFactory.createForClass(Stock)
