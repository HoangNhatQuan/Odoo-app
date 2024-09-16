import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Video, VideoSchema } from './entities/video.entity'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'
import { VideoGateway } from './video.gateway'
import { YoutubeApiService } from 'providers/youtube-api/youtube-api.service'
import { UserService } from 'modules/users/services/user.service'
import { NotificationService } from 'modules/notifications/notification.service'
import { User, UserSchema } from 'modules/users/entities/users.entity'
import {
  NotificationSchema,
  Notification,
} from 'modules/notifications/entities/notification.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [VideoController],
  providers: [
    VideoService,
    VideoGateway,
    YoutubeApiService,
    UserService,
    NotificationService,
  ],
})
export class VideoModule {}
