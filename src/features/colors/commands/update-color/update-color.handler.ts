import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateColorCommand } from './update-color.command';
import { Color } from '../../color.entity';

@CommandHandler(UpdateColorCommand)
export class UpdateColorHandler implements ICommandHandler<UpdateColorCommand> {
  constructor(@InjectRepository(Color) private repo: Repository<Color>) {}
  async execute({ id, dto }: UpdateColorCommand) {
    const color = await this.repo.findOne({ where: { id } });
    if (!color) throw new NotFoundException('Rang topilmadi');
    Object.assign(color, dto);
    return this.repo.save(color);
  }
}
