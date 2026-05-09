import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { CreateCarMakeCommand } from './create-car-make.command';
import { CarMake } from '../../car-make.entity';

@CommandHandler(CreateCarMakeCommand)
export class CreateCarMakeHandler implements ICommandHandler<CreateCarMakeCommand> {
  constructor(@InjectRepository(CarMake) private repo: Repository<CarMake>) {}
  async execute({ dto }: CreateCarMakeCommand) {
    const exists = await this.repo.findOne({ where: { title: dto.title } });
    if (exists) throw new ConflictException('Bu marka allaqachon mavjud');
    return this.repo.save(this.repo.create(dto));
  }
}
