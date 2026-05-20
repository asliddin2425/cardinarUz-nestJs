import { IsNumber, IsBoolean, IsEnum, IsOptional, IsEmail, IsString, MaxLength, Matches, IsArray, ArrayMinSize } from 'class-validator';
import { PaymentMethod } from '../../../../shared/enums';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @IsNumber() @ApiProperty() productId: number;
  @IsNumber() @ApiProperty() articulId: number;
  @IsNumber() @ApiProperty() quantity: number;
}

export class CreateOrderDto {
  @IsNumber() @ApiProperty() branchId: number;
  @IsString() @MaxLength(64) @ApiProperty() fullName: string;
  @Matches(/^\+998\d{9}$/) @ApiProperty() phoneNumber: string;
  @IsOptional() @IsEmail() @ApiProperty() email?: string;
  @IsBoolean() @ApiProperty() delivery: boolean;
  @IsEnum(PaymentMethod) @ApiProperty() paymentMethod: PaymentMethod;
  @IsArray() @ArrayMinSize(1) @ApiProperty() items: OrderItemDto[];
}
