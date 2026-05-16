import {
  IsString, IsNumber, IsOptional, IsEnum,
  IsBoolean, MaxLength, IsArray, ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '../../../../shared/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNumber()
  @ApiProperty()
  categoryId: number;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  title: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isPremium?: boolean;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  colorIds?: number[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  images?: { image: string; position: number }[];
}
