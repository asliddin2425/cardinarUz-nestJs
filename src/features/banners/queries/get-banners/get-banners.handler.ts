import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBannersQuery } from './get-banners.query';
import { Banner } from '../../banner.entity';

@QueryHandler(GetBannersQuery)
export class GetBannersHandler implements IQueryHandler<GetBannersQuery> {
  constructor(@InjectRepository(Banner) private repo: Repository<Banner>) {}
  execute({ onlyActive }: GetBannersQuery) {
    const where = onlyActive ? { isActive: true } : {};
    return this.repo.find({ where, order: { createdAt: 'DESC' } });
  }
}
