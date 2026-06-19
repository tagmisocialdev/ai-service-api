import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { producer, consumer, connectProducer, connectConsumer } from './kafka.client';

@Module({})
export class EventsModule implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await connectProducer();
    await connectConsumer();
    console.log('Kafka producer & consumer connected');
  }
  async onModuleDestroy() {
    await producer.disconnect();
    await consumer.disconnect();
  }
}
