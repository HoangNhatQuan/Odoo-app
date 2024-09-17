import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Product, ProductSchema } from './entities/product.entity'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import {
  Inventory,
  InventorySchema,
} from 'modules/stores/entities/inventory.entity'
import { Stock, StockSchema } from 'modules/stores/entities/stock.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: Stock.name, schema: StockSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
