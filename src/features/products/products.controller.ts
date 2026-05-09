import {
  Body, Controller, Delete, Get,
  Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetProductsQuery, GetProductsDto } from './queries/get-products/get-products.query';
import { GetProductByIdQuery } from './queries/get-product-by-id/get-product-by-id.query';
import { CreateProductCommand } from './commands/create-product/create-product.command';
import { CreateProductDto } from './commands/create-product/create-product.dto';
import { UpdateProductCommand } from './commands/update-product/update-product.command';
import { UpdateProductDto } from './commands/update-product/update-product.dto';
import { DeleteProductCommand } from './commands/delete-product/delete-product.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags("Products")
@ApiBearerAuth("JWT")
@Controller('products')
export class ProductsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  findAll(@Query() dto: GetProductsDto) {
    return this.queryBus.execute(new GetProductsQuery(dto));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetProductByIdQuery(+id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateProductDto) {
    return this.commandBus.execute(new CreateProductCommand(dto));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.commandBus.execute(new UpdateProductCommand(+id, dto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteProductCommand(+id));
  }
}
