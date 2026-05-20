import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Matches } from 'class-validator';
export class CreateColorDto {

  @IsString() 
  @MaxLength(64) 
  @ApiProperty()
  title: string;

  @Matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { message: 'Hex rang noto\'g\'ri formatda' })
  @ApiProperty()
  color: string;
}
