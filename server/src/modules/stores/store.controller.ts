import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AuthGuard } from 'guards/auth.guard'
import { Store } from './entities/store.entity'

@UseGuards(AuthGuard)
@Controller('Stores')
export class StoreController {
  constructor(@InjectModel(Store.name) private StoreModel: Model<Store>) {}

  @Get('/me')
  async find(@Req() req) {
    return await this.StoreModel.findById(req.StoreId).select('-password')
  }
}
