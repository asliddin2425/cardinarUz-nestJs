import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateArticulCommand } from './create-articul.command';
import { Articul } from '../../articul.entity';
import { Product } from '../../../products/product.entity';
import { CarModel } from '../../../cars/car-model.entity';

@CommandHandler(CreateArticulCommand)
export class CreateArticulHandler implements ICommandHandler<CreateArticulCommand> {
  constructor(
    @InjectRepository(Articul) private repo: Repository<Articul>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(CarModel) private carModelRepo: Repository<CarModel>,
  ) {}
  async execute({ dto }: CreateArticulCommand) {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    const carModel = await this.carModelRepo.findOne({ where: { id: dto.carModelId } });
    if (!carModel) throw new NotFoundException('Avtomobil modeli topilmadi');
    const articul = this.repo.create(dto);
    return this.repo.save(articul);
  }
}
