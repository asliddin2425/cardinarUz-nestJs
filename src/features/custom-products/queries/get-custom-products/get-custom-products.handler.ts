import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCustomProductsQuery } from './get-custom-products.query';
import { CustomProduct } from '../../custom-product.entity';

@QueryHandler(GetCustomProductsQuery)
export class GetCustomProductsHandler implements IQueryHandler<GetCustomProductsQuery> {
  constructor(@InjectRepository(CustomProduct) private repo: Repository<CustomProduct>) {}
  async execute({ pagination }: GetCustomProductsQuery) {
    const [data, total] = await this.repo.findAndCount({
      relations: ['carMake', 'carModel', 'model'],
      skip: pagination.skip,
      take: pagination.limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page: pagination.page, limit: pagination.limit, totalPages: Math.ceil(total / pagination.limit) };
  }
}
