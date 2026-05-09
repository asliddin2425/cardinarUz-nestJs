import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetProductByIdQuery } from './get-product-by-id.query';
import { Product } from '../../product.entity';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler implements IQueryHandler<GetProductByIdQuery> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async execute({ id }: GetProductByIdQuery) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['images', 'category', 'productColors', 'productColors.color', 'articuls', 'articuls.carModel', 'articuls.carModel.carMake'],
    });
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    return product;
  }
}
