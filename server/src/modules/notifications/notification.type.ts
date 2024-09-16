import { Types } from 'mongoose'

export interface INotification {
  _id?: Types.ObjectId
  sender: Types.ObjectId
  recipient: Types.ObjectId
  videoId: Types.ObjectId
  message: string
  isRead: string

  createdAt?: any
  updatedAt?: any
}
