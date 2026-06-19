/**
 * KafkaModule
 *
 * Registers a Kafka producer for publishing analysis results
 * and imports event handlers that consume content events.
 *
 * AI Service consumes: content.created, content.updated,
 *   ai.reanalysis.requested
 * AI Service produces: ai.analysis.completed, ai.moderation.flagged
 */

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ContentEventHandler } from './handlers/content-event.handler';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_PRODUCER',
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'ai-service-producer',
              brokers: config.get<string[]>('kafka.brokers') || [
                'localhost:9092',
              ],
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [ContentEventHandler],
  exports: [ClientsModule],
})
export class KafkaModule {}
