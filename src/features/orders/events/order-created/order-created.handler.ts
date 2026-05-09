import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from './order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  handle(event: OrderCreatedEvent) {
    // SMS yuborish, notification, log yozish
    console.log(`✅ Yangi buyurtma yaratildi: #${event.orderId}, User: ${event.userId}`);
  }
}
