import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { JwtModule } from '@nestjs/jwt'
import { ScheduleModule } from '@nestjs/schedule'

import { AppController } from './app.controller'
import configuration from './configs/configuration'
import { UserModule } from './modules/users/users.module'
import { AppService } from './app.service'
import { OrderModule } from 'modules/orders/order.module'
import { ProductModule } from 'modules/products/product.module'
import { StoreModule } from 'modules/stores/store.module'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret', { infer: true }),
      }),
      global: true,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongodb.uri', { infer: true }),
        }
      },
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({ wildcard: true }),
    UserModule,
    OrderModule,
    ProductModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
