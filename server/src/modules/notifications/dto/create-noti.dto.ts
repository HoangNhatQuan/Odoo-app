import { IsNotEmpty, IsString } from 'class-validator'

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  sender: string

  @IsString()
  @IsNotEmpty()
  recipient: string

  @IsString()
  @IsNotEmpty()
  videoId: string

  @IsString()
  @IsNotEmpty()
  message: string
}
