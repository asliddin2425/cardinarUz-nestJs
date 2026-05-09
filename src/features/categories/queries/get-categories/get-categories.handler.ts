import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCategoriesQuery } from './get-categories.query';
import { Category } from '../../category.entity';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}
  execute() { return this.repo.find({ order: { title: 'ASC' } }); }
}
