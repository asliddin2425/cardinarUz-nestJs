import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { GetCartQuery } from './queries/get-cart/get-cart.query';
import { AddToCartCommand } from './commands/add-to-cart/add-to-cart.command';
import { AddToCartDto } from './commands/add-to-cart/add-to-cart.dto';
import { RemoveFromCartCommand } from './commands/remove-from-cart/remove-from-cart.command';
import { ClearCartCommand } from './commands/clear-cart/clear-cart.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Cart")
@ApiBearerAuth('JWT')
@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  @Get() getCart(@CurrentUser('id') userId: number) { return this.queryBus.execute(new GetCartQuery(userId)); }
  @Post() addItem(@CurrentUser('id') userId: number, @Body() dto: AddToCartDto) {
    return this.commandBus.execute(new AddToCartCommand(userId, dto));
  }
  @Delete('clear') clearCart(@CurrentUser('id') userId: number) {
    return this.commandBus.execute(new ClearCartCommand(userId));
  }
  @Delete(':id') removeItem(@CurrentUser('id') userId: number, @Param('id') id: number) {
    return this.commandBus.execute(new RemoveFromCartCommand(userId, +id));
  }
}
