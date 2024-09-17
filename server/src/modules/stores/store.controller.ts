import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AuthGuard } from 'guards/auth.guard'
import { Store } from './entities/store.entity'
import { CreateStoreDto } from './dto/create-store.dto'
import { UserRole } from 'modules/users/users.type'
import { Roles } from 'decorators/roles.decorator'

@UseGuards(AuthGuard)
@Controller('stores')
export class StoreController {
  constructor(@InjectModel(Store.name) private StoreModel: Model<Store>) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() body: CreateStoreDto) {
    const store = new this.StoreModel(body)
    return store.save()
  }

  @Get()
  async getStores() {
    return this.StoreModel.find()
  }
}
