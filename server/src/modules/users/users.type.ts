import { Types } from 'mongoose'

export interface IUser {
  _id?: Types.ObjectId
  name: string
  email: string
  username: string
  password: string

  createdAt?: any
  updatedAt?: any
}
