import { IsString, MaxLength, Matches, IsOptional } from 'class-validator';
export class UpdateColorDto {
  @IsOptional() @IsString() @MaxLength(64) title?: string;
  @IsOptional() @Matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/) color?: string;
}
