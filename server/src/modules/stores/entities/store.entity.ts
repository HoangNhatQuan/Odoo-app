import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IStore } from '../store.type'

export type StoreDocument = HydratedDocument<Store>

@Schema({ autoIndex: true, timestamps: true })
export class Store implements IStore {
  _id?: Types.ObjectId

  @Prop({ type: String, index: true, required: true })
  address: string

  @Prop({ type: String, index: true, required: true })
  name: string

  @Prop({ type: String, index: true, required: true })
  phone: string

  createdAt?: any
  updatedAt?: any
}

export const StoreSchema = SchemaFactory.createForClass(Store)
