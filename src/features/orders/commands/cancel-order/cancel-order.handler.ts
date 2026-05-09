import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CancelOrderCommand } from './cancel-order.command';
import { Order } from '../../order.entity';
import { OrderStatus } from '../../../../shared/enums';

@CommandHandler(CancelOrderCommand)
export class CancelOrderHandler implements ICommandHandler<CancelOrderCommand> {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async execute({ id, userId }: CancelOrderCommand) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Buyurtma topilmadi');
    if (order.userId !== userId) throw new ForbiddenException('Bu buyurtma sizniki emas');
    order.status = OrderStatus.CANCELED;
    return this.repo.save(order);
  }
}
