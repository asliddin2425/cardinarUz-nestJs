import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveFromCartCommand } from './remove-from-cart.command';
import { CartItem } from '../../cart-item.entity';

@CommandHandler(RemoveFromCartCommand)
export class RemoveFromCartHandler implements ICommandHandler<RemoveFromCartCommand> {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}
  async execute({ userId, itemId }: RemoveFromCartCommand) {
    const item = await this.repo.findOne({ where: { id: itemId, userId } });
    if (!item) throw new NotFoundException('Savatda topilmadi');
    await this.repo.remove(item);
    return { message: 'O\'chirildi' };
  }
}
