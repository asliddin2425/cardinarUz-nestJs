import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductsQuery } from './get-products.query';
import { Product } from '../../product.entity';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async execute({ dto }: GetProductsQuery) {
    const qb = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.images', 'images')
      .leftJoinAndSelect('p.category', 'category')
      .leftJoinAndSelect('p.productColors', 'pc')
      .leftJoinAndSelect('pc.color', 'color')
      .orderBy('p.createdAt', 'DESC')
      .skip(dto.skip)
      .take(dto.limit);

    if (dto.status) qb.andWhere('p.status = :status', { status: dto.status });
    if (dto.isPremium !== undefined) qb.andWhere('p.isPremium = :isPremium', { isPremium: dto.isPremium });
    if (dto.categoryId) qb.andWhere('p.categoryId = :categoryId', { categoryId: dto.categoryId });

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page: dto.page,
      limit: dto.limit,
      totalPages: Math.ceil(total / dto.limit),
    };
  }
}
