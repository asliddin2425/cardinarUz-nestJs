// import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { GetStaticInfoQuery } from './get-static-info.query';
// import { StaticInfo } from '../../static-info.entity';

// @QueryHandler(GetStaticInfoQuery)
// export class GetStaticInfoHandler implements IQueryHandler<GetStaticInfoQuery> {
//   constructor(@InjectRepository(StaticInfo) private repo: Repository<StaticInfo>) {}
//   execute() { return this.repo.findOne({ where: { id: 1 } }); }
// }

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetStaticInfoQuery } from './get-static-info.query';
import { StaticInfo } from '@features/static-info/static-info.entity';
import { GetStaticInfoResponse } from './get-statsic-info.response';

@QueryHandler(GetStaticInfoQuery)
export class GetStaticInfoHandler
  implements IQueryHandler<GetStaticInfoQuery>
{
  constructor(
    @InjectRepository(StaticInfo)
    private readonly repo: Repository<StaticInfo>,
  ) {}

  async execute(_query: GetStaticInfoQuery): Promise<GetStaticInfoResponse> {
    const info = await this.repo.findOne({ where: { id: 1 } });
    if (!info) {
      throw new NotFoundException(
        'StaticInfo record not found. Please seed the database.',
      );
    }
    return new GetStaticInfoResponse(info);
  }
}