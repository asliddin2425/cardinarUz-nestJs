import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  fullName: string;

  @Matches(/^\+998\d{9}$/, { message: 'Telefon raqam +998XXXXXXXXX formatida bo\'lishi kerak' })
  @ApiProperty()
  phoneNumber: string;

  @IsEmail({}, { message: 'Email noto\'g\'ri formatda' })
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' })
  @MaxLength(32)
  @ApiProperty()
  password: string;
}
