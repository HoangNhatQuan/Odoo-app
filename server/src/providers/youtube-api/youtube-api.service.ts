import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class YoutubeApiService {
  constructor(private readonly configService: ConfigService) {}

  isValidYouTubeUrl(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return regex.test(url)
  }

  extractVideoId(url: string): string | null {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  async getYouTubeMetadata(videoId: string) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          params: {
            id: videoId,
            part: 'snippet',
            key: this.configService.get<string>('youtubeApi.key', {
              infer: true,
            }),
          },
        },
      )

      const videoData = response.data.items[0].snippet
      return {
        title: videoData.title,
        thumbnail: videoData.thumbnails.default.url,
        description: videoData.description,
      }
    } catch (error) {
      console.error('Error get metadata:', error)
      return null
    }
  }
}
