import { IUser } from '../auth/auth.type'
import { IVideo } from '../video/video.type'

export type INotification = {
  _id: string
  sender: IUser
  recipient: IUser
  videoId: IVideo
  message: string
  isRead: string

  createdAt?: any
  updatedAt?: any
}
