import { IsString, MaxLength, IsNumber, IsEnum, IsBoolean, IsOptional, IsEmail, Matches } from 'class-validator';
import { ProductCategory } from '../../../../shared/enums';

export class CreateCustomProductDto {
  @IsString() @MaxLength(64) fullName: string;
  @Matches(/^\+998\d{9}$/) phoneNumber: string;
  @IsOptional() @IsEmail() email?: string;
  @IsNumber() carMakeId: number;
  @IsNumber() carModelId: number;
  @IsEnum(ProductCategory) category: ProductCategory;
  @IsNumber() modelId: number;
  @IsBoolean() withLogo: boolean;
  @IsString() @MaxLength(256) image: string;
}
