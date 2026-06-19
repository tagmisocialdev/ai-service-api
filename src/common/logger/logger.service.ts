/**
 * AppLogger
 *
 * Structured logger for AI Service using Pino. Outputs JSON
 * in production and pretty-printed coloured output in development.
 *
 * NEVER log: passwords, tokens, card numbers, full request bodies.
 */

import { Injectable, LoggerService, Scope } from '@nestjs/common';
import pino from 'pino';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private logger: pino.Logger;
  private context = 'AiService';

  constructor() {
    const isDev = process.env.NODE_ENV !== 'production';

    this.logger = pino({
      level: isDev ? 'debug' : 'info',
      transport: isDev
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
      base: { service: 'ai-service' },
    });
  }

  setContext(context: string): void {
    this.context = context;
  }

  log(message: string, ...optionalParams: unknown[]): void {
    this.logger.info(
      { context: this.context, ...this.extractMeta(optionalParams) },
      message,
    );
  }

  error(message: string, trace?: string, ...optionalParams: unknown[]): void {
    this.logger.error(
      { context: this.context, trace, ...this.extractMeta(optionalParams) },
      message,
    );
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    this.logger.warn(
      { context: this.context, ...this.extractMeta(optionalParams) },
      message,
    );
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    this.logger.debug(
      { context: this.context, ...this.extractMeta(optionalParams) },
      message,
    );
  }

  verbose(message: string, ...optionalParams: unknown[]): void {
    this.logger.trace(
      { context: this.context, ...this.extractMeta(optionalParams) },
      message,
    );
  }

  private extractMeta(params: unknown[]): Record<string, unknown> {
    if (
      params.length > 0 &&
      typeof params[params.length - 1] === 'object' &&
      params[params.length - 1] !== null
    ) {
      return params[params.length - 1] as Record<string, unknown>;
    }
    return {};
  }
}
