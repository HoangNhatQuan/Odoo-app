import { Types } from 'mongoose'

export interface IStore {
  _id?: Types.ObjectId
  address: string
  name: string
  phone: string

  createdAt?: any
  updatedAt?: any
}

export interface IStock {
  _id?: Types.ObjectId
  product: Types.ObjectId
  quantity: number
  store: Types.ObjectId

  createdAt?: any
  updatedAt?: any
}

export interface IInventory {
  _id?: Types.ObjectId
  product: Types.ObjectId
  quantity: number

  createdAt?: any
  updatedAt?: any
}
