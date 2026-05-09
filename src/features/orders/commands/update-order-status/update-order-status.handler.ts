import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateOrderStatusCommand } from './update-order-status.command';
import { Order } from '../../order.entity';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler implements ICommandHandler<UpdateOrderStatusCommand> {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async execute({ id, dto }: UpdateOrderStatusCommand) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Buyurtma topilmadi');
    order.status = dto.status;
    return this.repo.save(order);
  }
}
