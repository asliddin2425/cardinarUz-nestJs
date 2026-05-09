import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  fullName?: string;

  @IsOptional()
  @ApiProperty()
  @Matches(/^\+998\d{9}$/, { message: 'Telefon raqam +998XXXXXXXXX formatida bo\'lishi kerak' })
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;
}
