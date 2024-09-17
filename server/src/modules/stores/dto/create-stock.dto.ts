import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  product: string

  @IsString()
  @IsNotEmpty()
  store: string

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number
}
