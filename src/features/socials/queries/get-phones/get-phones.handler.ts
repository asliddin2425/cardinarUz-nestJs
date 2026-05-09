import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPhonesQuery } from './get-phones.query';
import { PhoneNumber } from '../../phone-number.entity';

@QueryHandler(GetPhonesQuery)
export class GetPhonesHandler implements IQueryHandler<GetPhonesQuery> {
  constructor(@InjectRepository(PhoneNumber) private repo: Repository<PhoneNumber>) {}
  execute() { return this.repo.find(); }
}
