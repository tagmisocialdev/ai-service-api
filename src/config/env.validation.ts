/**
 * Environment Variable Validation
 *
 * Validates all required env vars when AI Service starts.
 * AI Service is lightweight — it only needs Kafka config
 * and an HTTP port for health checks.
 */

import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .default('development'),
  PORT: Joi.number().default(5005),

  // Kafka (Redpanda)
  KAFKA_BROKERS: Joi.string().default('localhost:9092'),
  KAFKA_GROUP_ID: Joi.string().default('ai-service'),
});
