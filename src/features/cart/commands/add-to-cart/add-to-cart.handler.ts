import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddToCartCommand } from './add-to-cart.command';
import { CartItem } from '../../cart-item.entity';

@CommandHandler(AddToCartCommand)
export class AddToCartHandler implements ICommandHandler<AddToCartCommand> {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}
  async execute({ userId, dto }: AddToCartCommand) {
    const existing = await this.repo.findOne({
      where: { userId, productId: dto.productId, articulId: dto.articulId },
    });
    if (existing) {
      existing.quantity += dto.quantity;
      return this.repo.save(existing);
    }
    return this.repo.save(this.repo.create({ userId, ...dto }));
  }
}
