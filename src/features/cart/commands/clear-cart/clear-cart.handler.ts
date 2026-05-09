import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClearCartCommand } from './clear-cart.command';
import { CartItem } from '../../cart-item.entity';

@CommandHandler(ClearCartCommand)
export class ClearCartHandler implements ICommandHandler<ClearCartCommand> {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}
  async execute({ userId }: ClearCartCommand) {
    await this.repo.delete({ userId });
    return { message: 'Savatcha tozalandi' };
  }
}
