import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsController } from './cars.controller';
import { CarMake } from './car-make.entity';
import { CarModel } from './car-model.entity';
import { GetCarMakesHandler } from './queries/get-car-makes/get-car-makes.handler';
import { GetCarModelsHandler } from './queries/get-car-models/get-car-models.handler';
import { CreateCarMakeHandler } from './commands/create-car-make/create-car-make.handler';
import { CreateCarModelHandler } from './commands/create-car-model/create-car-model.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CarMake, CarModel])],
  controllers: [CarsController],
  providers: [GetCarMakesHandler, GetCarModelsHandler, CreateCarMakeHandler, CreateCarModelHandler],
  exports: [TypeOrmModule],
})
export class CarsModule {}
