import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Store, StoreSchema } from './entities/store.entity'
import { StoreController } from './store.controller'
import { StoreService } from './store.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
