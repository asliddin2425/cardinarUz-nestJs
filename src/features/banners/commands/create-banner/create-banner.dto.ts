import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';
export class CreateBannerDto {
  @IsString()
  @MaxLength(128)
  @ApiProperty()
  title: string;


  @IsString() 
  @MaxLength(256) 
  @ApiProperty()
  image: string;

  @IsOptional() 
  @IsBoolean() 
  @ApiProperty()
  isActive?: boolean;
}
