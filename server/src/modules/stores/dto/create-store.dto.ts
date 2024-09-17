import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  phone: string
}
