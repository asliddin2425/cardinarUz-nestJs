import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticInfoController } from './static-info.controller';
import { StaticInfo } from './static-info.entity';
import { GetStaticInfoHandler } from './queries/get-static-info/get-static-info.handler';
import { UpdateStaticInfoHandler } from './commands/update-static-info/update-static-info.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([StaticInfo])],
  controllers: [StaticInfoController],
  providers: [GetStaticInfoHandler, UpdateStaticInfoHandler],
})
export class StaticInfoModule {}
