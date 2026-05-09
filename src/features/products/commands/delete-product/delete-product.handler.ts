import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DeleteProductCommand } from './delete-product.command';
import { Product } from '../../product.entity';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async execute({ id }: DeleteProductCommand) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    await this.productRepo.remove(product);
    return { message: 'Mahsulot o\'chirildi' };
  }
}
