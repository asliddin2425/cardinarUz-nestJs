import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNumber } from 'class-validator';
export class CreateCarModelDto {
  @IsNumber() 
  @ApiProperty()
  carMakeId: number;

  @IsString() 
  @MaxLength(64) 
  @ApiProperty()
  title: string;
}
