import { IsNotEmpty, IsString } from 'class-validator'

export class ShareVideoDto {
  @IsString()
  @IsNotEmpty()
  url: string
}
