import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesController } from './branches.controller';
import { Branch } from './branch.entity';
import { GetBranchesHandler } from './queries/get-branches/get-branches.handler';
import { CreateBranchHandler } from './commands/create-branch/create-branch.handler';
import { UpdateBranchHandler } from './commands/update-branch/update-branch.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Branch])],
  controllers: [BranchesController],
  providers: [GetBranchesHandler, CreateBranchHandler, UpdateBranchHandler],
  exports: [TypeOrmModule],
})
export class BranchesModule {}
