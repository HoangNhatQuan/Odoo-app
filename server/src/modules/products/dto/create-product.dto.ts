import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number
}
