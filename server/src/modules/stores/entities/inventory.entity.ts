import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { IInventory } from '../store.type'
import { Product } from 'modules/products/entities/product.entity'

export type InventoryDocument = HydratedDocument<Inventory>

@Schema({ autoIndex: true, timestamps: true })
export class Inventory implements IInventory {
  _id?: Types.ObjectId

  @Prop({
    type: Types.ObjectId,
    index: true,
    required: true,
    ref: Product.name,
  })
  product: Types.ObjectId

  @Prop({ type: Number, default: 0 })
  quantity: number

  createdAt?: any
  updatedAt?: any
}

export const InventorySchema = SchemaFactory.createForClass(Inventory)
