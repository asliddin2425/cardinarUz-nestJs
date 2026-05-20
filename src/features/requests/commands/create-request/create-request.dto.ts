import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsEmail, Matches } from 'class-validator';
export class CreateRequestDto {
  @IsString() @MaxLength(64) @ApiProperty() fullName: string;
  @Matches(/^\+998\d{9}$/) @ApiProperty() phoneNumber: string;
  @IsOptional() @IsEmail() @ApiProperty() email?: string;
  @IsOptional() @IsString() @MaxLength(2000) @ApiProperty() comments?: string;
}
