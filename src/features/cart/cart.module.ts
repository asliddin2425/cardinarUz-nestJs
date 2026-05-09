import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartItem } from './cart-item.entity';
import { GetCartHandler } from './queries/get-cart/get-cart.handler';
import { AddToCartHandler } from './commands/add-to-cart/add-to-cart.handler';
import { RemoveFromCartHandler } from './commands/remove-from-cart/remove-from-cart.handler';
import { ClearCartHandler } from './commands/clear-cart/clear-cart.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CartItem])],
  controllers: [CartController],
  providers: [GetCartHandler, AddToCartHandler, RemoveFromCartHandler, ClearCartHandler],
})
export class CartModule {}
