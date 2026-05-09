import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetColorsQuery } from './get-colors.query';
import { Color } from '../../color.entity';

@QueryHandler(GetColorsQuery)
export class GetColorsHandler implements IQueryHandler<GetColorsQuery> {
  constructor(@InjectRepository(Color) private repo: Repository<Color>) {}
  execute() { return this.repo.find({ order: { title: 'ASC' } }); }
}
