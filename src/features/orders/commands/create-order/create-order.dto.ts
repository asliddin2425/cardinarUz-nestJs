import { IsNumber, IsBoolean, IsEnum, IsOptional, IsEmail, IsString, MaxLength, Matches, IsArray, ArrayMinSize } from 'class-validator';
import { PaymentMethod } from '../../../../shared/enums';

export class OrderItemDto {
  @IsNumber() productId: number;
  @IsNumber() articulId: number;
  @IsNumber() quantity: number;
}

export class CreateOrderDto {
  @IsNumber() branchId: number;
  @IsString() @MaxLength(64) fullName: string;
  @Matches(/^\+998\d{9}$/) phoneNumber: string;
  @IsOptional() @IsEmail() email?: string;
  @IsBoolean() delivery: boolean;
  @IsEnum(PaymentMethod) paymentMethod: PaymentMethod;
  @IsArray() @ArrayMinSize(1) items: OrderItemDto[];
}
