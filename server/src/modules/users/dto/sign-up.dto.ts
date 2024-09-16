import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator'
import { UserRole } from '../users.type'

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  username: string

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole

  @IsString()
  @IsOptional()
  categoryId: string
}
