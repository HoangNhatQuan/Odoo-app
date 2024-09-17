import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IUser, UserRole } from '../users.type'
import { UserCategory } from './user-category.entity'

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

  @Prop({ type: String, default: UserRole.USER })
  role: UserRole

  @Prop({ type: String, required: true, index: true })
  username: string

  @Prop({
    type: Types.ObjectId,
    default: null,
    ref: UserCategory.name,
  })
  category: Types.ObjectId

  createdAt?: any
  updatedAt?: any
}

export const UserSchema = SchemaFactory.createForClass(User)
