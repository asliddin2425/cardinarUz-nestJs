import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetOrderByIdQuery } from './get-order-by-id.query';
import { Order } from '../../order.entity';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler implements IQueryHandler<GetOrderByIdQuery> {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async execute({ id }: GetOrderByIdQuery) {
    const order = await this.repo.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product', 'orderItems.articul', 'branch', 'user'],
    });
    if (!order) throw new NotFoundException('Buyurtma topilmadi');
    return order;
  }
}
