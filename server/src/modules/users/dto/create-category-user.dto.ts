import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryUserDto {
  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  @IsNotEmpty()
  discount: string
}
