import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCartQuery } from './get-cart.query';
import { CartItem } from '../../cart-item.entity';

@QueryHandler(GetCartQuery)
export class GetCartHandler implements IQueryHandler<GetCartQuery> {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}
  async execute({ userId }: GetCartQuery) {
    const items = await this.repo.find({
      where: { userId },
      relations: ['product', 'product.images', 'articul', 'articul.carModel'],
    });
    const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
    return { items, total };
  }
}
