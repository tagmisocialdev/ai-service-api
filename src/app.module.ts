/**
 * AppModule
 *
 * Root module for AI Service. Wires together config, logging,
 * and the Kafka module for consuming content events and publishing
 * analysis results.
 *
 * AI Service is Kafka-only — it never receives synchronous calls.
 * Content Service and Core API interact with it entirely through
 * Kafka events.
 *
 * Team members will add AI/ML pipeline modules here as they build
 * out moderation, categorisation, and recommendation features.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, kafkaConfig, envValidationSchema } from './config';
import { LoggerModule } from './common/logger/logger.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, kafkaConfig],
      validationSchema: envValidationSchema,
    }),

    LoggerModule,
    KafkaModule,
  ],
})
export class AppModule {}
