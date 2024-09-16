import { Types } from 'mongoose'

export interface IOrder {
  _id?: Types.ObjectId
  customer: Types.ObjectId
  orderItems: Types.ObjectId[]
  totalPrice: number
  status: Status
  shippingOption: ShippingOption

  createdAt?: any
  updatedAt?: any
}

export enum Status {
  CREATED = 'Created',
  PROCESSING = 'Processing',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  RETURNED = 'Returned',
}

export enum ShippingOption {
  FREESHIPPING = 'Free Shipping',
  PICKUP = 'Pickup',
}

export interface IOrderItem {
  _id?: Types.ObjectId
  product: Types.ObjectId
  quantity: number

  createdAt?: any
  updatedAt?: any
}
