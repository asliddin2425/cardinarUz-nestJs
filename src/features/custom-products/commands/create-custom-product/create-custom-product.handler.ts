import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCustomProductCommand } from './create-custom-product.command';
import { CustomProduct } from '../../custom-product.entity';
import { CarMake } from '../../../cars/car-make.entity';
import { CarModel } from '../../../cars/car-model.entity';
import { CustomModel } from '../../custom-model.entity';

@CommandHandler(CreateCustomProductCommand)
export class CreateCustomProductHandler implements ICommandHandler<CreateCustomProductCommand> {
  constructor(
    @InjectRepository(CustomProduct) private repo: Repository<CustomProduct>,
    @InjectRepository(CarMake) private makeRepo: Repository<CarMake>,
    @InjectRepository(CarModel) private modelRepo: Repository<CarModel>,
    @InjectRepository(CustomModel) private customModelRepo: Repository<CustomModel>,
  ) {}
  async execute({ dto }: CreateCustomProductCommand) {
    const make = await this.makeRepo.findOne({ where: { id: dto.carMakeId } });
    if (!make) throw new NotFoundException('Avtomobil markasi topilmadi');
    const model = await this.modelRepo.findOne({ where: { id: dto.carModelId } });
    if (!model) throw new NotFoundException('Avtomobil modeli topilmadi');
    const customModel = await this.customModelRepo.findOne({ where: { id: dto.modelId } });
    if (!customModel) throw new NotFoundException('Model topilmadi');
    return this.repo.save(this.repo.create(dto));
  }
}
