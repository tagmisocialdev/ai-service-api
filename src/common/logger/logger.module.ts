/**
 * LoggerModule
 *
 * Global module that provides AppLogger to every module in the app.
 * Import once in AppModule — no need to import anywhere else.
 */

import { Global, Module } from '@nestjs/common';
import { AppLogger } from './logger.service';

@Global()
@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
