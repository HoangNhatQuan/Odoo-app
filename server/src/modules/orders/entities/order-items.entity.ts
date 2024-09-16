import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IOrderItem } from '../order.type'

export type OrderItemDocument = HydratedDocument<OrderItem>

@Schema({ autoIndex: true, timestamps: true })
export class OrderItem implements IOrderItem {
  _id?: Types.ObjectId

  @Prop({ type: Types.ObjectId, index: true, required: true })
  product: Types.ObjectId

  @Prop({ type: Number, required: true })
  quantity: number

  createdAt?: any
  updatedAt?: any
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem)
