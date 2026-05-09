import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';
import { ProductColor } from './product-color.entity';
import { Category } from '../categories/category.entity';
import { GetProductsHandler } from './queries/get-products/get-products.handler';
import { GetProductByIdHandler } from './queries/get-product-by-id/get-product-by-id.handler';
import { CreateProductHandler } from './commands/create-product/create-product.handler';
import { UpdateProductHandler } from './commands/update-product/update-product.handler';
import { DeleteProductHandler } from './commands/delete-product/delete-product.handler';

const QueryHandlers = [GetProductsHandler, GetProductByIdHandler];
const CommandHandlers = [CreateProductHandler, UpdateProductHandler, DeleteProductHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product, ProductImage, ProductColor, Category]),
  ],
  controllers: [ProductsController],
  providers: [...QueryHandlers, ...CommandHandlers],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
