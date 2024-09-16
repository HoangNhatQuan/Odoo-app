import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Store, StoreSchema } from './entities/store.entity'
import { StoreController } from './store.controller'
import { StoreService } from './store.service'
import { Inventory, InventorySchema } from './entities/inventory.entity'
import { Stock, StockSchema } from './entities/stock.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: Stock.name, schema: StockSchema },
    ]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
