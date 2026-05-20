import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
export class AddToCartDto {
  @IsNumber() 
  @ApiProperty()
  productId: number;

  @IsNumber() 
  @ApiProperty()
  articulId: number;

  @IsNumber() 
  @Min(1) 
  @ApiProperty()
  quantity: number;
}
