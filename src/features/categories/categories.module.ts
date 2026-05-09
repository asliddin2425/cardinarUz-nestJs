import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { Category } from './category.entity';
import { GetCategoriesHandler } from './queries/get-categories/get-categories.handler';
import { CreateCategoryHandler } from './commands/create-category/create-category.handler';
import { UpdateCategoryHandler } from './commands/update-category/update-category.handler';
import { DeleteCategoryHandler } from './commands/delete-category/delete-category.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [GetCategoriesHandler, CreateCategoryHandler, UpdateCategoryHandler, DeleteCategoryHandler],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
