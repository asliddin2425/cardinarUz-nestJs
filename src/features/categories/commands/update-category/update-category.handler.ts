import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateCategoryCommand } from './update-category.command';
import { Category } from '../../category.entity';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}
  async execute({ id, dto }: UpdateCategoryCommand) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Kategoriya topilmadi');
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
