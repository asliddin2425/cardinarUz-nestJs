import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSocialsQuery } from './get-socials.query';
import { SocialLink } from '../../social-link.entity';

@QueryHandler(GetSocialsQuery)
export class GetSocialsHandler implements IQueryHandler<GetSocialsQuery> {
  constructor(@InjectRepository(SocialLink) private repo: Repository<SocialLink>) {}
  execute() { return this.repo.find(); }
}
