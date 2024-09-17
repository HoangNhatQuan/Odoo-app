import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCategoryUserDto {
  @IsString()
  @IsNotEmpty()
  category: string

  @IsNumber()
  @IsNotEmpty()
  discount: number
}
