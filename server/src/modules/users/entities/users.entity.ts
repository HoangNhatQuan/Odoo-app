import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IUser } from '../users.type'

export type UserDocument = HydratedDocument<User>

@Schema({ autoIndex: true, timestamps: true })
export class User implements IUser {
  _id?: Types.ObjectId

  @Prop({ type: String, index: true, required: true })
  name: string

  @Prop({ type: String, required: true, index: true, unique: true })
  email: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String, default: '', index: true })
  username: string

  createdAt?: any
  updatedAt?: any
}

export const UserSchema = SchemaFactory.createForClass(User)
