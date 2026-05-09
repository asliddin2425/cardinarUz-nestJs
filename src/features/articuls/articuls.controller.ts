import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetArticulsQuery } from './queries/get-articuls/get-articuls.query';
import { CreateArticulCommand } from './commands/create-articul/create-articul.command';
import { CreateArticulDto } from './commands/create-articul/create-articul.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Articuls")
@ApiBearerAuth('JWT')
@Controller('articuls')
export class ArticulsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get() findAll(@Query('productId') productId?: number) {
    return this.queryBus.execute(new GetArticulsQuery(productId ? +productId : undefined));
  }

  @Post() 
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateArticulDto) { 
    return this.commandBus.execute(new CreateArticulCommand(dto)); 
  }
}
