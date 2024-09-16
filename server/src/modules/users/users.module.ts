import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthController } from './controllers/auth.controller'
import { User, UserSchema } from './entities/users.entity'
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import {
  RefreshToken,
  RefreshTokenSchema,
} from './entities/refresh-token.entity'
import { UserController } from './controllers/user.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class UserModule {}
