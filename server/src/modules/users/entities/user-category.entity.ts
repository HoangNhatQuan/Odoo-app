import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IUserCategory } from '../users.type'

export type UserCategoryDocument = HydratedDocument<UserCategory>

@Schema({ autoIndex: true, timestamps: true })
export class UserCategory implements IUserCategory {
  _id?: Types.ObjectId

  @Prop({ type: String, index: true, required: true, unique: true })
  category: string

  @Prop({ type: String, required: true, index: true })
  discount: string

  createdAt?: any
  updatedAt?: any
}

export const UserCategorySchema = SchemaFactory.createForClass(UserCategory)
