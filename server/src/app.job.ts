import { Injectable, Logger } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import axios from 'axios'

@Injectable()
export class AppJob {
  private logger = new Logger('AppJob')

  @Interval(1000 * 60 * 10)
  async runServer() {
    try {
      const response = await axios.get<string>(
        `https://youtube-video-sharing-app-hm44.onrender.com`,
      )
      return this.logger.log(response.data)
    } catch (e) {
      return this.logger.error('Error run server', e)
    }
  }
}
