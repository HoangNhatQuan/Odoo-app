import { Types } from 'mongoose'

export interface IVideo {
  _id?: Types.ObjectId
  referrer: Types.ObjectId
  videoYtbId: string
  url: string
  title: string
  description: string
  thumbnail: string

  createdAt?: any
  updatedAt?: any
}

export interface ISharedVideo {
  _id?: Types.ObjectId
  userId: Types.ObjectId
  videoId: Types.ObjectId

  createdAt?: any
  updatedAt?: any
}
