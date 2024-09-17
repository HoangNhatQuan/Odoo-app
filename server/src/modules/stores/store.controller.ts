import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AuthGuard } from 'guards/auth.guard'
import { Store } from './entities/store.entity'
import { CreateStoreDto } from './dto/create-store.dto'
import { UserRole } from 'modules/users/users.type'
import { Roles } from 'decorators/roles.decorator'
import { Stock } from './entities/stock.entity'

@UseGuards(AuthGuard)
@Controller('stores')
export class StoreController {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() body: CreateStoreDto) {
    return await this.storeModel.create(body)
  }

  @Get('/:id')
  async getStockByStore(@Param('id') id: string) {
    return this.stockModel.find({ store: id }).populate('product')
  }

  @Get()
  async getStores() {
    return this.storeModel.find()
  }
}
