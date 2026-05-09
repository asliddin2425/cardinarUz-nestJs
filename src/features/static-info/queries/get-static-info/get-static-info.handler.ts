import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetStaticInfoQuery } from './get-static-info.query';
import { StaticInfo } from '../../static-info.entity';

@QueryHandler(GetStaticInfoQuery)
export class GetStaticInfoHandler implements IQueryHandler<GetStaticInfoQuery> {
  constructor(@InjectRepository(StaticInfo) private repo: Repository<StaticInfo>) {}
  execute() { return this.repo.findOne({ where: { id: 1 } }); }
}
