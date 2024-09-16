import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Notification } from './entities/notification.entity'
import { MIN_OFFSET } from 'pipelines/offset.pipe'
import { MAX_LIMIT } from 'pipelines/limit.pipe'
import { CreateNotificationDto } from './dto/create-noti.dto'

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notiModel: Model<Notification>,
  ) {}

  async getNotifications({
    offset = MIN_OFFSET,
    limit = MAX_LIMIT,
    userId,
  }: {
    offset?: number
    limit?: number
    userId: string
  }) {
    return await this.notiModel
      .find(
        { recipient: userId },
        {},
        { sort: { createdAt: -1 }, skip: offset, limit },
      )
      .populate('videoId')
      .populate('sender', 'name')
      .populate('recipient', 'name')
  }

  async markRead(id: string) {
    return await this.notiModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    )
  }

  async create(createNotificationDto: CreateNotificationDto) {
    return await this.notiModel.create(createNotificationDto)
  }
}
