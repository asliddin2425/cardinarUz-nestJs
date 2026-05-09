import { IsString, MaxLength, IsOptional, IsEmail, Matches } from 'class-validator';
export class UpdateStaticInfoDto {
  @IsOptional() @IsString() @MaxLength(128) address?: string;
  @IsOptional() @Matches(/^\+998\d{9}$/) phoneNumber?: string;
  @IsOptional() @IsString() @MaxLength(128) workingHours?: string;
  @IsOptional() @IsEmail() email?: string;
}
