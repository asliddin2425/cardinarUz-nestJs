import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class CreateArticulDto {
  @IsNumber()
  @ApiProperty()
  productId: number;

  @IsNumber() 
  @ApiProperty()
  carModelId: number;
}
