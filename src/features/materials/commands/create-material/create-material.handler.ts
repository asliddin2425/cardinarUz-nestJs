import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { CreateMaterialCommand } from './create-material.command';
import { Material } from '../../material.entity';

@CommandHandler(CreateMaterialCommand)
export class CreateMaterialHandler implements ICommandHandler<CreateMaterialCommand> {
  constructor(@InjectRepository(Material) private repo: Repository<Material>) {}
  async execute({ dto }: CreateMaterialCommand) {
    const exists = await this.repo.findOne({ where: { title: dto.title } });
    if (exists) throw new ConflictException('Bu material allaqachon mavjud');
    return this.repo.save(this.repo.create(dto));
  }
}
