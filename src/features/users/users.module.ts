import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { GetUsersHandler } from './queries/get-users/get-users.handler';
import { GetUserByIdHandler } from './queries/get-user-by-id/get-user-by-id.handler';
import { UpdateUserHandler } from './commands/update-user/update-user.handler';

const QueryHandlers = [GetUsersHandler, GetUserByIdHandler];
const CommandHandlers = [UpdateUserHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [...QueryHandlers, ...CommandHandlers],
  exports: [TypeOrmModule],
})
export class UsersModule {}
