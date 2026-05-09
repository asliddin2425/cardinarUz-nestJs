import {
  IsString, IsNumber, IsOptional, IsEnum,
  IsBoolean, MaxLength, IsArray, ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '../../../../shared/enums';

export class CreateProductDto {
  @IsNumber()
  categoryId: number;

  @IsString()
  @MaxLength(128)
  title: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;

  @IsOptional()
  @IsArray()
  colorIds?: number[];

  @IsOptional()
  @IsArray()
  images?: { image: string; position: number }[];
}
