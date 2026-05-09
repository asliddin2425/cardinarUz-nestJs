import { IsString, MaxLength, IsUrl } from 'class-validator';
export class CreateSocialDto {
  @IsString() @MaxLength(64) title: string;
  @IsUrl() link: string;
  @IsString() @MaxLength(128) icon: string;
}
