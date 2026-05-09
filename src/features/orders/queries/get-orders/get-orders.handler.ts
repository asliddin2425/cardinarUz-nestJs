import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOrdersQuery } from './get-orders.query';
import { Order } from '../../order.entity';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async execute({ pagination, userId }: GetOrdersQuery) {
    const where = userId ? { userId } : {};
    const [data, total] = await this.repo.findAndCount({
      where,
      relations: ['orderItems', 'orderItems.product', 'branch', 'user'],
      skip: pagination.skip,
      take: pagination.limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page: pagination.page, limit: pagination.limit, totalPages: Math.ceil(total / pagination.limit) };
  }
}
