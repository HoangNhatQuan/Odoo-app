import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from '../entities/users.entity'
import { AuthGuard } from 'guards/auth.guard'

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Get('/me')
  async find(@Req() req) {
    return await this.userModel.findById(req.userId).select('-password')
  }
}
