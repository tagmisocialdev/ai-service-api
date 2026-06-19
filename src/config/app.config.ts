/**
 * Application Configuration
 *
 * Centralised configuration for AI Service. All environment variables
 * are read here and nowhere else.
 *
 * AI Service is Kafka-only — no gRPC server, no database.
 * It consumes content events, runs analysis, and publishes results.
 */

import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '5005', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
}));

export const kafkaConfig = registerAs('kafka', () => ({
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  groupId: process.env.KAFKA_GROUP_ID || 'ai-service',
}));
