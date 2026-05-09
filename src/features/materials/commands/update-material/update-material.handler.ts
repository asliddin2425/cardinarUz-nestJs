import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateMaterialCommand } from './update-material.command';
import { Material } from '../../material.entity';

@CommandHandler(UpdateMaterialCommand)
export class UpdateMaterialHandler implements ICommandHandler<UpdateMaterialCommand> {
  constructor(@InjectRepository(Material) private repo: Repository<Material>) {}
  async execute({ id, dto }: UpdateMaterialCommand) {
    const material = await this.repo.findOne({ where: { id } });
    if (!material) throw new NotFoundException('Material topilmadi');
    Object.assign(material, dto);
    return this.repo.save(material);
  }
}
