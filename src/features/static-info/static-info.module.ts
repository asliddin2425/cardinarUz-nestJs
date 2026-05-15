// import { Module } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { StaticInfoController } from './static-info.controller';
// import { StaticInfo } from './static-info.entity';
// import { GetStaticInfoHandler } from './queries/get-static-info/get-static-info.handler';
// import { UpdateStaticInfoHandler } from './commands/update-static-info/update-static-info.handler';

// @Module({
//   imports: [CqrsModule, TypeOrmModule.forFeature([StaticInfo])],
//   controllers: [StaticInfoController],
//   providers: [GetStaticInfoHandler, UpdateStaticInfoHandler],
// })
// export class StaticInfoModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticInfo } from './static-info.entity';
import { GetStaticInfoController } from './queries/get-static-info/get-statsic-info.controller';
import { UpdateStaticInfoController } from './commands/update-static-info/update-static-info.controller';
import { GetStaticInfoHandler } from './queries/get-static-info/get-static-info.handler';
import { UpdateStaticInfoHandler } from './commands/update-static-info/update-static-info.handler';


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([StaticInfo]),
  ],
  controllers: [
    GetStaticInfoController,
    UpdateStaticInfoController,
  ],
  providers: [
    GetStaticInfoHandler,
    UpdateStaticInfoHandler,
  ],
})
export class StaticInfoModule {}