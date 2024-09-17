import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  product: string

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number
}
