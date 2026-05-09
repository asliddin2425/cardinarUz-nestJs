import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticulsController } from './articuls.controller';
import { Articul } from './articul.entity';
import { Product } from '../products/product.entity';
import { CarModel } from '../cars/car-model.entity';
import { GetArticulsHandler } from './queries/get-articuls/get-articuls.handler';
import { CreateArticulHandler } from './commands/create-articul/create-articul.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Articul, Product, CarModel])],
  controllers: [ArticulsController],
  providers: [GetArticulsHandler, CreateArticulHandler],
  exports: [TypeOrmModule],
})
export class ArticulsModule {}
