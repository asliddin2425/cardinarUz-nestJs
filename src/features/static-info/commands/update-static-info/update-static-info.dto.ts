// import { IsString, MaxLength, IsOptional, IsEmail, Matches } from 'class-validator';
// export class UpdateStaticInfoDto {
//   @IsOptional() @IsString() @MaxLength(128) address?: string;
//   @IsOptional() @Matches(/^\+998\d{9}$/) phoneNumber?: string;
//   @IsOptional() @IsString() @MaxLength(128) workingHours?: string;
//   @IsOptional() @IsEmail() email?: string;
// }

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateStaticInfoDto {
  @ApiPropertyOptional({
    example: 'Toshkent, Chilonzor tumani, 3-mavze',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  address?: string;

  @ApiPropertyOptional({ example: '+998901234567', maxLength: 16 })
  @IsOptional()
  @IsString()
  @MaxLength(16)
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'Dushanba-Shanba: 09:00-18:00',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  workingHours?: string;

  @ApiPropertyOptional({ example: 'info@company.uz', maxLength: 64 })
  @IsOptional()
  @IsEmail()
  @MaxLength(64)
  email?: string;
}