import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { CreateCategoryCommand } from './create-category.command';
import { Category } from '../../category.entity';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}
  async execute({ dto }: CreateCategoryCommand) {
    const exists = await this.repo.findOne({ where: { title: dto.title } });
    if (exists) throw new ConflictException('Bu kategoriya allaqachon mavjud');
    return this.repo.save(this.repo.create(dto));
  }
}
