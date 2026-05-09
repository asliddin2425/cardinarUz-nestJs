import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateCarModelCommand } from './create-car-model.command';
import { CarModel } from '../../car-model.entity';
import { CarMake } from '../../car-make.entity';

@CommandHandler(CreateCarModelCommand)
export class CreateCarModelHandler implements ICommandHandler<CreateCarModelCommand> {
  constructor(
    @InjectRepository(CarModel) private repo: Repository<CarModel>,
    @InjectRepository(CarMake) private makeRepo: Repository<CarMake>,
  ) {}
  async execute({ dto }: CreateCarModelCommand) {
    const make = await this.makeRepo.findOne({ where: { id: dto.carMakeId } });
    if (!make) throw new NotFoundException('Avtomobil markasi topilmadi');
    const exists = await this.repo.findOne({ where: { title: dto.title } });
    if (exists) throw new ConflictException('Bu model allaqachon mavjud');
    return this.repo.save(this.repo.create(dto));
  }
}
