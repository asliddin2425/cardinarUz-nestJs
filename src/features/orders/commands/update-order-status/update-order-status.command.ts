import { UpdateOrderStatusDto } from './update-order-status.dto';
export class UpdateOrderStatusCommand { constructor(public readonly id: number, public readonly dto: UpdateOrderStatusDto) {} }
