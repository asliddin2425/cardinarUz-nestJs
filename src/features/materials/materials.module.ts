import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsController } from './materials.controller';
import { Material } from './material.entity';
import { GetMaterialsHandler } from './queries/get-materials/get-materials.handler';
import { CreateMaterialHandler } from './commands/create-material/create-material.handler';
import { UpdateMaterialHandler } from './commands/update-material/update-material.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Material])],
  controllers: [MaterialsController],
  providers: [GetMaterialsHandler, CreateMaterialHandler, UpdateMaterialHandler],
  exports: [TypeOrmModule],
})
export class MaterialsModule {}
