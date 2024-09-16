import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { User } from '../entities/users.entity'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return await this.userModel.find()
  }

  async getUserById(id: string | Types.ObjectId) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }
}
