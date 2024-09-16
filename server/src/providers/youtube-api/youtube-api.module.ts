import { Module } from '@nestjs/common'

import { YoutubeApiService } from './youtube-api.service'

@Module({
  imports: [],
  controllers: [],
  providers: [YoutubeApiService],
})
export class YoutubeApiModule {}
