import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomProductsController } from './custom-products.controller';
import { CustomProduct } from './custom-product.entity';
import { CustomModel } from './custom-model.entity';
import { CustomPart } from './custom-part.entity';
import { CarMake } from '../cars/car-make.entity';
import { CarModel } from '../cars/car-model.entity';
import { GetCustomProductsHandler } from './queries/get-custom-products/get-custom-products.handler';
import { CreateCustomProductHandler } from './commands/create-custom-product/create-custom-product.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CustomProduct, CustomModel, CustomPart, CarMake, CarModel])],
  controllers: [CustomProductsController],
  providers: [GetCustomProductsHandler, CreateCustomProductHandler],
})
export class CustomProductsModule {}
