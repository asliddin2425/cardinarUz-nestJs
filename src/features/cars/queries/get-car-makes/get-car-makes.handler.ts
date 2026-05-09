import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCarMakesQuery } from './get-car-makes.query';
import { CarMake } from '../../car-make.entity';

@QueryHandler(GetCarMakesQuery)
export class GetCarMakesHandler implements IQueryHandler<GetCarMakesQuery> {
  constructor(@InjectRepository(CarMake) private repo: Repository<CarMake>) {}
  execute() { return this.repo.find({ relations: ['carModels'], order: { title: 'ASC' } }); }
}
