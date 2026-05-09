import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetArticulsQuery } from './get-articuls.query';
import { Articul } from '../../articul.entity';

@QueryHandler(GetArticulsQuery)
export class GetArticulsHandler implements IQueryHandler<GetArticulsQuery> {
  constructor(@InjectRepository(Articul) private repo: Repository<Articul>) {}
  execute({ productId }: GetArticulsQuery) {
    const where = productId ? { productId } : {};
    return this.repo.find({ where, relations: ['product', 'carModel', 'carModel.carMake'] });
  }
}
