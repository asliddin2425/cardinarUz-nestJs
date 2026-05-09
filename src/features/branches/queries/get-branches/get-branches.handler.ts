import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBranchesQuery } from './get-branches.query';
import { Branch } from '../../branch.entity';

@QueryHandler(GetBranchesQuery)
export class GetBranchesHandler implements IQueryHandler<GetBranchesQuery> {
  constructor(@InjectRepository(Branch) private repo: Repository<Branch>) {}
  execute({ onlyActive }: GetBranchesQuery) {
    const where = onlyActive ? { isActive: true } : {};
    return this.repo.find({ where, order: { title: 'ASC' } });
  }
}
