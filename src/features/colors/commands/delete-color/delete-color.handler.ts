import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DeleteColorCommand } from './delete-color.command';
import { Color } from '../../color.entity';

@CommandHandler(DeleteColorCommand)
export class DeleteColorHandler implements ICommandHandler<DeleteColorCommand> {
  constructor(@InjectRepository(Color) private repo: Repository<Color>) {}
  async execute({ id }: DeleteColorCommand) {
    const color = await this.repo.findOne({ where: { id } });
    if (!color) throw new NotFoundException('Rang topilmadi');
    await this.repo.remove(color);
    return { message: 'O\'chirildi' };
  }
}
