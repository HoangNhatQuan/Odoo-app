import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Order, OrderSchema } from './entities/order.entity'
import { OrderItem, OrderItemSchema } from './entities/order-items.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import {
  Product,
  ProductSchema,
} from 'modules/products/entities/product.entity'
import { User, UserSchema } from 'modules/users/entities/users.entity'
import {
  UserCategory,
  UserCategorySchema,
} from 'modules/users/entities/user-category.entity'
import { Store, StoreSchema } from 'modules/stores/entities/store.entity'
import {
  Inventory,
  InventorySchema,
} from 'modules/stores/entities/inventory.entity'
import { Stock, StockSchema } from 'modules/stores/entities/stock.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: UserCategory.name, schema: UserCategorySchema },
      { name: Store.name, schema: StoreSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: Stock.name, schema: StockSchema },
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
