import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { User } from '../entities/users.entity'
import { SignUpDto } from '../dto/sign-up.dto'
import { SignInDto } from '../dto/sign-in.dto'
import { RefreshToken } from '../entities/refresh-token.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpData: SignUpDto) {
    const { email, password } = signUpData

    const user = await this.userModel.findOne({ email })
    if (user) throw new BadRequestException('email already used')

    const hashedPassword = await bcrypt.hash(password, 10)
    return await this.userModel.create({
      ...signUpData,
      password: hashedPassword,
    })
  }

  async signIn(credentials: SignInDto) {
    const { username, password } = credentials
    const user = await this.userModel.findOne({
      $or: [{ email: username }, { username }],
    })

    if (!user) throw new UnauthorizedException('Wrong credentials')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new UnauthorizedException('Wrong credentials')

    //Generate JWT tokens
    const tokens = await this.generateUserTokens(user._id.toString())
    return tokens
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.refreshTokenModel.findOne({
      token: refreshToken,
      expiredAt: { $gte: new Date() },
    })

    if (!token) {
      throw new UnauthorizedException('Refresh Token is invalid')
    }
    return this.generateUserTokens(token.userId.toString())
  }

  async generateUserTokens(userId: string) {
    const user = await this.userModel.findById(userId)
    const payload = { sub: userId, username: user.username, role: user.role }
    const accessToken = this.jwtService.sign(payload, { expiresIn: '2 days' })
    const refreshToken = uuidv4()

    await this.storeRefreshToken(refreshToken, userId)
    return {
      accessToken,
      refreshToken,
    }
  }

  async storeRefreshToken(token: string, userId: string) {
    // Calculate expiry date 7 days from now
    const expiredAt = new Date()
    expiredAt.setDate(expiredAt.getDate() + 7)

    await this.refreshTokenModel.updateOne(
      { userId },
      { $set: { expiredAt, token } },
      { upsert: true },
    )
  }
}
