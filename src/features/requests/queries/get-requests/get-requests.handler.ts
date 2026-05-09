import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRequestsQuery } from './get-requests.query';
import { Request } from '../../request.entity';

@QueryHandler(GetRequestsQuery)
export class GetRequestsHandler implements IQueryHandler<GetRequestsQuery> {
  constructor(@InjectRepository(Request) private repo: Repository<Request>) {}
  async execute({ pagination }: GetRequestsQuery) {
    const [data, total] = await this.repo.findAndCount({
      relations: ['user'],
      skip: pagination.skip,
      take: pagination.limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page: pagination.page, limit: pagination.limit, totalPages: Math.ceil(total / pagination.limit) };
  }
}
