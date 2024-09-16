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
import { YoutubeApiModule } from 'providers/youtube-api/youtube-api.module'
import { NotificationModule } from 'modules/notifications/notification.module'
import { VideoModule } from 'modules/videos/video.module'
import { AppJob } from 'app.job'

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
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({ wildcard: true }),
    UserModule,
    YoutubeApiModule,
    NotificationModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppJob],
})
export class AppModule {}
