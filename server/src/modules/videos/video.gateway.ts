import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { IVideo } from './video.type'
import { UserService } from 'modules/users/services/user.service'
import { NotificationService } from 'modules/notifications/notification.service'

@WebSocketGateway({ cors: { origin: '*' } })
export class VideoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server

  constructor(
    private readonly userService: UserService,
    private readonly notiService: NotificationService,
  ) {}

  private userSocketMap: Map<string, string> = new Map()

  handleConnection(client: Socket) {
    console.log('Connect successfully:', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnected:', client.id)
    const userSocketMap = this.userSocketMap
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === client.id) {
        userSocketMap.delete(userId)
        break
      }
    }
  }

  @SubscribeMessage('register-socket')
  handleRegister(client: Socket, userId: string) {
    this.userSocketMap.set(userId, client.id)
    console.log(`${userId} registered with socket ID: ${client.id}`)
  }

  async notifyNewVideo(video: IVideo) {
    const { title, referrer } = video
    const users = await this.userService.getUsers()
    const user = await this.userService.getUserById(referrer)
    const message = `${user.name} shared a new video: ${title}`

    for (const recipient of users) {
      if (recipient._id.toString() !== user._id.toString()) {
        const notification = await this.notiService.create({
          message,
          recipient: recipient._id.toString(),
          sender: user._id.toString(),
          videoId: video._id.toString(),
        })

        const recipientSocketId = this.userSocketMap.get(
          recipient._id.toString(),
        )
        if (recipientSocketId) {
          console.log('Notification sent to', recipientSocketId)
          this.wss.to(recipientSocketId).emit('newNotification', notification)
        }
      }
    }
  }
}
