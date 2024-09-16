import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Order, OrderSchema } from './entities/order.entity'
import { OrderItem, OrderItemSchema } from './entities/order-items.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      {
        name: OrderItem.name,
        schema: OrderItemSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
