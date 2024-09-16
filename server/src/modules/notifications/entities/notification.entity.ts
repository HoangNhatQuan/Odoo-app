import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { User } from 'modules/users/entities/users.entity'
import { Video } from 'modules/videos/entities/video.entity'
import { INotification } from '../notification.type'

export type NotificationDocument = HydratedDocument<Notification>

@Schema({ autoIndex: true, timestamps: true })
export class Notification implements INotification {
  _id?: Types.ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  sender: Types.ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  recipient: Types.ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: Video.name })
  videoId: Types.ObjectId

  @Prop({ type: String, required: true })
  message: string

  @Prop({ type: Boolean, default: false })
  isRead: string

  createdAt?: any
  updatedAt?: any
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
NotificationSchema.index({ recipient: 1, sender: 1, videoId: 1 })
