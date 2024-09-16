import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
} from 'class-validator'

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
}
