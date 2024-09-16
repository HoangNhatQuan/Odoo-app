import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Store } from './entities/store.entity'

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store.name) private StoreModel: Model<Store>) {}

  async getStores() {
    return await this.StoreModel.find()
  }

  async getStoreById(id: string | Types.ObjectId) {
    const Store = await this.StoreModel.findById(id)
    if (!Store) {
      throw new NotFoundException('Store not found')
    }
    return Store
  }
}
