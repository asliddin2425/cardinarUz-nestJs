import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { GetRequestsQuery } from './queries/get-requests/get-requests.query';
import { CreateRequestCommand } from './commands/create-request/create-request.command';
import { CreateRequestDto } from './commands/create-request/create-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Requests")
@ApiBearerAuth("JWT")
@Controller('requests')
export class RequestsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get() @UseGuards(JwtAuthGuard, AdminGuard)
  findAll(@Query() pagination: PaginationDto) { return this.queryBus.execute(new GetRequestsQuery(pagination)); }

  @Post()
  create(@Body() dto: CreateRequestDto, @CurrentUser('id') userId?: number) {
    return this.commandBus.execute(new CreateRequestCommand(dto, userId));
  }
}
