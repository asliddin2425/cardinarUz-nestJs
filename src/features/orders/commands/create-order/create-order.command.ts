import { CreateOrderDto } from './create-order.dto';
export class CreateOrderCommand { constructor(public readonly userId: number, public readonly dto: CreateOrderDto) {} }
