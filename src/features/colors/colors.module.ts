import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsController } from './colors.controller';
import { Color } from './color.entity';
import { GetColorsHandler } from './queries/get-colors/get-colors.handler';
import { CreateColorHandler } from './commands/create-color/create-color.handler';
import { UpdateColorHandler } from './commands/update-color/update-color.handler';
import { DeleteColorHandler } from './commands/delete-color/delete-color.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Color])],
  controllers: [ColorsController],
  providers: [GetColorsHandler, CreateColorHandler, UpdateColorHandler, DeleteColorHandler],
  exports: [TypeOrmModule],
})
export class ColorsModule {}
