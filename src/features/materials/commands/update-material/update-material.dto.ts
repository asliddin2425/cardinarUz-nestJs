import { IsString, MaxLength, IsOptional } from 'class-validator';
export class UpdateMaterialDto {
  @IsOptional() @IsString() @MaxLength(64) title?: string;
  @IsOptional() @IsString() @MaxLength(512) description?: string;
}
