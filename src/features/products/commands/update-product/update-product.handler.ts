import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductCommand } from './update-product.command';
import { Product } from '../../product.entity';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async execute({ id, dto }: UpdateProductCommand) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Mahsulot topilmadi');

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }
}
