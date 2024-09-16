import {
  Controller,
  Get,
  UseGuards,
  Query,
  Param,
  Patch,
  Req,
} from '@nestjs/common'

import { AuthGuard } from 'guards/auth.guard'
import { ParseOffsetPipe } from 'pipelines/offset.pipe'
import { ParseLimitPipe } from 'pipelines/limit.pipe'
import { NotificationService } from './notification.service'

@UseGuards(AuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notiService: NotificationService) {}

  @Get()
  async getNotifications(
    @Req() req,
    @Query('offset', ParseOffsetPipe) offset: number,
    @Query('limit', ParseLimitPipe) limit: number,
  ) {
    return await this.notiService.getNotifications({
      offset,
      limit,
      userId: req.userId,
    })
  }

  @Patch('/:id/mark-read')
  async markRead(@Param('id') id: string) {
    return await this.notiService.markRead(id)
  }
}
