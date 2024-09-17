import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class RemoveItemDto {
  @IsString()
  @IsNotEmpty()
  product: string

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number
}
