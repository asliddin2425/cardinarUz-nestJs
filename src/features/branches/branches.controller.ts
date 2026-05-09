import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetBranchesQuery } from './queries/get-branches/get-branches.query';
import { CreateBranchCommand } from './commands/create-branch/create-branch.command';
import { CreateBranchDto } from './commands/create-branch/create-branch.dto';
import { UpdateBranchCommand } from './commands/update-branch/update-branch.command';
import { UpdateBranchDto } from './commands/update-branch/update-branch.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Branches")
@ApiBearerAuth('JWT')
@Controller('branches')
export class BranchesController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  @Get() findAll(@Query('active') active?: string) {
    return this.queryBus.execute(new GetBranchesQuery(active === 'true'));
  }

  @Post() @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateBranchDto) { return this.commandBus.execute(new CreateBranchCommand(dto)); }
  
  @Patch(':id') @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: number, @Body() dto: UpdateBranchDto) { return this.commandBus.execute(new UpdateBranchCommand(+id, dto)); }
}
