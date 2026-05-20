import { IsString, MaxLength, IsNumber, IsEnum, IsBoolean, IsOptional, IsEmail, Matches } from 'class-validator';
import { ProductCategory } from '../../../../shared/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomProductDto {
  @IsString() @MaxLength(64) @ApiProperty() fullName: string;
  @Matches(/^\+998\d{9}$/) @ApiProperty() phoneNumber: string;
  @IsOptional() @IsEmail() @ApiProperty() email?: string;
  @IsNumber() @ApiProperty() carMakeId: number;
  @IsNumber() @ApiProperty() carModelId: number;
  @IsEnum(ProductCategory) @ApiProperty() category: ProductCategory;
  @IsNumber() @ApiProperty() modelId: number;
  @IsBoolean() @ApiProperty() withLogo: boolean;
  @IsString()  @MaxLength(256) @ApiProperty() image: string;
}
