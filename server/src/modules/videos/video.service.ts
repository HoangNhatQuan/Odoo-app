import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Video } from './entities/video.entity'
import { ShareVideoDto } from './dto/share-video.dto'
import { YoutubeApiService } from 'providers/youtube-api/youtube-api.service'
import { MIN_OFFSET } from 'pipelines/offset.pipe'
import { MAX_LIMIT } from 'pipelines/limit.pipe'
import { VideoGateway } from './video.gateway'

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<Video>,
    private readonly youtubeService: YoutubeApiService,
    private readonly videoGateway: VideoGateway,
  ) {}
  private async isVideoIdUnique(videoYtbId: string): Promise<boolean> {
    const video = await this.videoModel.findOne({ videoYtbId })
    return !video
  }

  async getVideos({
    offset = MIN_OFFSET,
    limit = MAX_LIMIT,
  }: {
    offset?: number
    limit?: number
  }) {
    const videos = await this.videoModel
      .find({}, {}, { sort: { createdAt: -1 }, skip: offset, limit })
      .populate('referrer', 'name')

    const count = await this.videoModel.countDocuments()
    return { count, items: videos }
  }

  async shareVideo(userId: string, shareVideoDto: ShareVideoDto) {
    const { url } = shareVideoDto

    if (!this.youtubeService.isValidYouTubeUrl(url)) {
      throw new BadRequestException('Invalid YouTube URL')
    }

    const videoId = this.youtubeService.extractVideoId(url)
    if (!videoId) {
      throw new BadRequestException('Unable to extract video ID from URL')
    }
    const isVideoIdUnique = await this.isVideoIdUnique(videoId)
    if (!isVideoIdUnique) {
      throw new BadRequestException('Video already exists')
    }

    const metadata = await this.youtubeService.getYouTubeMetadata(videoId)
    if (!metadata) {
      throw new BadRequestException('Unable to fetch video metadata')
    }

    const newVideo = await this.videoModel.create({
      referrer: new Types.ObjectId(userId),
      videoYtbId: videoId,
      url,
      ...metadata,
    })
    this.videoGateway.notifyNewVideo(newVideo)
    return newVideo
  }
}
