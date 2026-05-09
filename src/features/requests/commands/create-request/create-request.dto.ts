import { IsString, MaxLength, IsOptional, IsEmail, Matches } from 'class-validator';
export class CreateRequestDto {
  @IsString() @MaxLength(64) fullName: string;
  @Matches(/^\+998\d{9}$/) phoneNumber: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MaxLength(2000) comments?: string;
}
