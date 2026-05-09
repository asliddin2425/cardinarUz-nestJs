import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetMaterialsQuery } from './get-materials.query';
import { Material } from '../../material.entity';

@QueryHandler(GetMaterialsQuery)
export class GetMaterialsHandler implements IQueryHandler<GetMaterialsQuery> {
  constructor(@InjectRepository(Material) private repo: Repository<Material>) {}
  execute() { return this.repo.find({ order: { title: 'ASC' } }); }
}
