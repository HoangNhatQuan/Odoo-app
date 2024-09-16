import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AuthGuard } from 'guards/auth.guard'
import { Order } from './entities/order.entity'

@UseGuards(AuthGuard)
@Controller('Orders')
export class OrderController {
  constructor(@InjectModel(Order.name) private OrderModel: Model<Order>) {}

  @Get('/me')
  async find(@Req() req) {
    return await this.OrderModel.findById(req.OrderId).select('-password')
  }
}
