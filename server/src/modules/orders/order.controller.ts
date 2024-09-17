import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'

import { AuthGuard } from 'guards/auth.guard'
import { OrderService } from './order.service'
import { AddItemDto } from './dto/add-item.dto'
import { RemoveItemDto } from './dto/remove-item.dto'
import { Roles } from 'decorators/roles.decorator'
import { UserRole } from 'modules/users/users.type'

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(UserRole.ADMIN)
  @Get('')
  async getOrders() {
    return await this.orderService.getOrders()
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOrderById(id)
  }

  @Post('add-item')
  async addOrderItem(@Req() req, @Body() body: AddItemDto) {
    return await this.orderService.addOrderItem(req.userId, body)
  }

  @Post('remove-item')
  async removeOrderItem(@Req() req, @Body() body: RemoveItemDto) {
    return await this.orderService.removeOrderItem(req.userId, body)
  }

  @Post('checkout')
  async checkout(
    @Req() req,
    @Body()
    { shippingOption, store }: { shippingOption: string; store: string },
  ) {
    return await this.orderService.checkoutOrder(
      req.userId,
      shippingOption,
      store,
    )
  }

  @Delete('')
  async deleteOrder(@Req() req) {
    return await this.orderService.cancelOrder(req.userId)
  }
}
