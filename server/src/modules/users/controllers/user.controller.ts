import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from '../entities/users.entity'
import { AuthGuard } from 'guards/auth.guard'
import { CreateCategoryUserDto } from '../dto/create-category-user.dto'
import { UserCategory } from '../entities/user-category.entity'
import { UserRole } from '../users.type'
import { Roles } from 'decorators/roles.decorator'

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserCategory.name)
    private userCategoryModel: Model<UserCategory>,
  ) {}

  @Get('/me')
  async find(@Req() req) {
    return await this.userModel.findById(req.userId).select('-password')
  }

  @Roles(UserRole.ADMIN)
  @Post('/categories')
  async createUserCategory(@Body() body: CreateCategoryUserDto) {
    return await this.userCategoryModel.create(body)
  }

  @Roles(UserRole.ADMIN)
  @Get('/categories')
  async getUserCategories() {
    return await this.userCategoryModel.find()
  }

  @Roles(UserRole.ADMIN)
  @Patch('/categories/:id')
  async updateUserCategory(@Param('id') id: string, @Body() body) {
    return await this.userCategoryModel.findByIdAndUpdate(id, body)
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body) {
    return await this.userModel.findByIdAndUpdate(id, body)
  }
}
