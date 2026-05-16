import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsUrl } from 'class-validator';
export class CreateSocialDto {

  @IsString() 
  @ApiProperty()
  @MaxLength(64) 
  title: string;

  @IsUrl() 
  @ApiProperty()
  link: string;


  @IsString() 
  @MaxLength(128) 
  @ApiProperty()
  icon: string;
}
