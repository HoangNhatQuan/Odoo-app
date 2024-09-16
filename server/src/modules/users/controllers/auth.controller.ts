import { Body, Controller, Post } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { SignUpDto } from '../dto/sign-up.dto'
import { SignInDto } from '../dto/sign-in.dto'
import { AuthService } from '../services/auth.service'
import { RefreshTokenDto } from '../dto/refresh-token.dto'
import { User } from '../entities/users.entity'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto)
  }

  @Post('/sign-in')
  async signIn(@Body() loginDto: SignInDto) {
    return await this.authService.signIn(loginDto)
  }

  @Post('refresh-token')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken)
  }
}
