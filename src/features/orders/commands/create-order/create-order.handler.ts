import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderCommand } from './create-order.command';
import { Order } from '../../order.entity';
import { OrderItem } from '../../order-item.entity';
import { Branch } from '../../../branches/branch.entity';
import { OrderCreatedEvent } from '../../events/order-created/order-created.event';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ userId, dto }: CreateOrderCommand) {
    const branch = await this.branchRepo.findOne({ where: { id: dto.branchId } });
    if (!branch) throw new NotFoundException('Filial topilmadi');

    const order = await this.orderRepo.save(
      this.orderRepo.create({
        userId,
        branchId: dto.branchId,
        fullName: dto.fullName,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
        delivery: dto.delivery,
        paymentMethod: dto.paymentMethod,
      }),
    );

    const items = dto.items.map((item) =>
      this.itemRepo.create({ orderId: order.id, ...item }),
    );
    await this.itemRepo.save(items);

    this.eventBus.publish(new OrderCreatedEvent(order.id, userId));

    return this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['orderItems', 'orderItems.product', 'branch'],
    });
  }
}
