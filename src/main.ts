/**
 * AI Service Bootstrap
 *
 * Starts a Kafka consumer for processing content events and a
 * minimal HTTP server on port 5005 (default) for health checks.
 *
 * AI Service has no gRPC server — it is entirely event-driven.
 * It consumes content.created, content.updated, and
 * ai.reanalysis.requested events, processes them through the
 * AI pipeline, and publishes results back to Kafka.
 *
 * Boot order:
 * 1. Create NestJS app with Express (for health endpoint)
 * 2. Attach Kafka microservice transport
 * 3. Start Kafka consumer and HTTP server
 */

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppLogger } from './common/logger/logger.service';

async function bootstrap(): Promise<void> {
  const logger = new AppLogger();
  logger.setContext('Bootstrap');

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port', 5005);
  const kafkaBrokers = config.get<string[]>('kafka.brokers', [
    'localhost:9092',
  ]);
  const kafkaGroupId = config.get<string>('kafka.groupId', 'ai-service');

  // Kafka consumer — the only transport for AI Service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'ai-service-consumer',
        brokers: kafkaBrokers,
      },
      consumer: {
        groupId: kafkaGroupId,
      },
    },
  });

  app.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(port);

  logger.log(`AI Service HTTP health on port ${port}`);
  logger.log(`Kafka consumer connected to ${kafkaBrokers.join(', ')}`);
}

bootstrap();
