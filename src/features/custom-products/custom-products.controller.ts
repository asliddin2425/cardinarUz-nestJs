import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { GetCustomProductsQuery } from './queries/get-custom-products/get-custom-products.query';
import { CreateCustomProductCommand } from './commands/create-custom-product/create-custom-product.command';
import { CreateCustomProductDto } from './commands/create-custom-product/create-custom-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Custom-Products")
@ApiBearerAuth("JWT")
@Controller('custom-products')
export class CustomProductsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get() @UseGuards(JwtAuthGuard, AdminGuard)
  findAll(@Query() pagination: PaginationDto) { return this.queryBus.execute(new GetCustomProductsQuery(pagination)); }

  @Post()
  create(@Body() dto: CreateCustomProductDto) { return this.commandBus.execute(new CreateCustomProductCommand(dto)); }
}
