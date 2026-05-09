import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Branch } from '../branches/branch.entity';
import { GetOrdersHandler } from './queries/get-orders/get-orders.handler';
import { GetOrderByIdHandler } from './queries/get-order-by-id/get-order-by-id.handler';
import { CreateOrderHandler } from './commands/create-order/create-order.handler';
import { UpdateOrderStatusHandler } from './commands/update-order-status/update-order-status.handler';
import { CancelOrderHandler } from './commands/cancel-order/cancel-order.handler';
import { OrderCreatedHandler } from './events/order-created/order-created.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Order, OrderItem, Branch])],
  controllers: [OrdersController],
  providers: [
    GetOrdersHandler, GetOrderByIdHandler,
    CreateOrderHandler, UpdateOrderStatusHandler, CancelOrderHandler,
    OrderCreatedHandler,
  ],
})
export class OrdersModule {}
