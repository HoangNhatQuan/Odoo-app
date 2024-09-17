import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IOrder, ShippingOption, Status } from '../order.type'
import { User } from 'modules/users/entities/users.entity'

export type OrderDocument = HydratedDocument<Order>

@Schema({ autoIndex: true, timestamps: true })
export class Order implements IOrder {
  _id?: Types.ObjectId

  @Prop({ type: Types.ObjectId, index: true, required: true, ref: User.name })
  customer: Types.ObjectId

  @Prop({ type: String, default: 'Created' })
  status: Status

  @Prop({ type: String, default: '' })
  shippingOption: ShippingOption

  @Prop({ type: Array, required: true })
  orderItems: Types.ObjectId[]

  @Prop({ type: Number, default: 0 })
  totalRawPrice: number

  @Prop({ type: Number, default: 0 })
  discount: number

  @Prop({ type: Number, default: 0 })
  totalPrice: number

  createdAt?: any
  updatedAt?: any
}

export const OrderSchema = SchemaFactory.createForClass(Order)
