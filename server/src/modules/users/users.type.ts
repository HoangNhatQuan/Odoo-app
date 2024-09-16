import { Types } from 'mongoose'

export interface IUser {
  _id?: Types.ObjectId
  name: string
  email: string
  username: string
  password: string
  role: UserRole
  category: Types.ObjectId

  createdAt?: any
  updatedAt?: any
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUserCategory {
  _id?: Types.ObjectId
  category: string
  discount: string

  createdAt?: any
  updatedAt?: any
}
