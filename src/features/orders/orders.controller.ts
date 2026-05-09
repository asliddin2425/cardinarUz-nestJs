import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { GetOrdersQuery } from './queries/get-orders/get-orders.query';
import { GetOrderByIdQuery } from './queries/get-order-by-id/get-order-by-id.query';
import { CreateOrderCommand } from './commands/create-order/create-order.command';
import { CreateOrderDto } from './commands/create-order/create-order.dto';
import { UpdateOrderStatusCommand } from './commands/update-order-status/update-order-status.command';
import { UpdateOrderStatusDto } from './commands/update-order-status/update-order-status.dto';
import { CancelOrderCommand } from './commands/cancel-order/cancel-order.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Orders")
@ApiBearerAuth("JWT")
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll(@Query() pagination: PaginationDto) {
    return this.queryBus.execute(new GetOrdersQuery(pagination));
  }

  @Get('my')
  myOrders(@CurrentUser('id') userId: number, @Query() pagination: PaginationDto) {
    return this.queryBus.execute(new GetOrdersQuery(pagination, userId));
  }

  @Get(':id')
  findOne(@Param('id') id: number) { return this.queryBus.execute(new GetOrderByIdQuery(+id)); }

  @Post()
  create(@CurrentUser('id') userId: number, @Body() dto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(userId, dto));
  }

  @Patch(':id/status')
  @UseGuards(AdminGuard)
  updateStatus(@Param('id') id: number, @Body() dto: UpdateOrderStatusDto) {
    return this.commandBus.execute(new UpdateOrderStatusCommand(+id, dto));
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: number, @CurrentUser('id') userId: number) {
    return this.commandBus.execute(new CancelOrderCommand(+id, userId));
  }
}
