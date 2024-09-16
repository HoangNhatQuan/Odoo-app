import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IVideo } from '../video.type'
import { User } from 'modules/users/entities/users.entity'

export type VideoDocument = HydratedDocument<Video>

@Schema({ autoIndex: true, timestamps: true })
export class Video implements IVideo {
  _id?: Types.ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  referrer: Types.ObjectId

  @Prop({ type: String, unique: true, index: true, required: true })
  videoYtbId: string

  @Prop({ type: String, required: true })
  url: string

  @Prop({ type: String, required: true, index: true })
  title: string

  @Prop({ type: String, default: '' })
  description: string

  @Prop({ type: String, default: '' })
  thumbnail: string

  createdAt?: any
  updatedAt?: any
}

export const VideoSchema = SchemaFactory.createForClass(Video)
