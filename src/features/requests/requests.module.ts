import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { Request } from './request.entity';
import { GetRequestsHandler } from './queries/get-requests/get-requests.handler';
import { CreateRequestHandler } from './commands/create-request/create-request.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Request])],
  controllers: [RequestsController],
  providers: [GetRequestsHandler, CreateRequestHandler],
})
export class RequestsModule {}
