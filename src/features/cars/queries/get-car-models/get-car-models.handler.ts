import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCarModelsQuery } from './get-car-models.query';
import { CarModel } from '../../car-model.entity';

@QueryHandler(GetCarModelsQuery)
export class GetCarModelsHandler implements IQueryHandler<GetCarModelsQuery> {
  constructor(@InjectRepository(CarModel) private repo: Repository<CarModel>) {}
  execute({ carMakeId }: GetCarModelsQuery) {
    const where = carMakeId ? { carMakeId } : {};
    return this.repo.find({ where, relations: ['carMake'], order: { title: 'ASC' } });
  }
}
