import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IOrderItem } from '../order.type'
import { Product } from 'modules/products/entities/product.entity'

export type OrderItemDocument = HydratedDocument<OrderItem>

@Schema({ autoIndex: true, timestamps: true })
export class OrderItem implements IOrderItem {
  _id?: Types.ObjectId

  @Prop({
    type: Types.ObjectId,
    index: true,
    required: true,
    ref: Product.name,
  })
  product: Types.ObjectId

  @Prop({ type: Types.ObjectId, index: true, required: true })
  orderId: Types.ObjectId

  @Prop({ type: Number, required: true, min: 1 })
  quantity: number

  createdAt?: any
  updatedAt?: any
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem)
