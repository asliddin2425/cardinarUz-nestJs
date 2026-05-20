import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional } from 'class-validator';
export class UpdateMaterialDto {
  @IsOptional() @IsString() @MaxLength(64) @ApiProperty() title?: string;
  @IsOptional() @IsString() @MaxLength(512) @ApiProperty() description?: string;
}
