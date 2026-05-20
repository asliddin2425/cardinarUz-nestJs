import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../../../shared/enums';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateOrderStatusDto { @IsEnum(OrderStatus) @ApiProperty() status: OrderStatus; }
