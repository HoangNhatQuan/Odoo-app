import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common'

import { AuthGuard } from 'guards/auth.guard'
import { ShareVideoDto } from './dto/share-video.dto'
import { VideoService } from './video.service'
import { ParseOffsetPipe } from 'pipelines/offset.pipe'
import { ParseLimitPipe } from 'pipelines/limit.pipe'

@UseGuards(AuthGuard)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getVideos(
    @Query('offset', ParseOffsetPipe) offset: number,
    @Query('limit', ParseLimitPipe) limit: number,
  ) {
    return this.videoService.getVideos({ offset, limit })
  }

  @Post('share')
  async shareVideo(@Req() req, @Body() shareVideoDto: ShareVideoDto) {
    return await this.videoService.shareVideo(req.userId, shareVideoDto)
  }
}
