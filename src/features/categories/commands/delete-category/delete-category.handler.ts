import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DeleteCategoryCommand } from './delete-category.command';
import { Category } from '../../category.entity';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}
  async execute({ id }: DeleteCategoryCommand) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Kategoriya topilmadi');
    await this.repo.remove(item);
    return { message: 'O\'chirildi' };
  }
}
