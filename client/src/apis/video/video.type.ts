import { IUser } from '../auth/auth.type'

export type IVideo = {
  _id: string
  videoYtbId: string
  title: string
  description: string
  thumbnail: string
  url: string
  referrer: IUser
  createdAt?: string
  updatedAt?: string
}
