/**
 * ContentEventHandler
 *
 * Consumes content-related Kafka events that need AI processing.
 * When new content is created or updated, AI Service analyses it
 * for moderation, categorisation, and engagement prediction.
 *
 * Team members will replace the placeholder log statements with
 * real AI/ML pipeline calls (OpenAI, custom models, etc.).
 */

import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppLogger } from '../../common/logger/logger.service';

@Injectable()
export class ContentEventHandler {
  private readonly logger = new AppLogger();

  constructor() {
    this.logger.setContext('ContentEventHandler');
  }

  /**
   * New content was created — run moderation + categorisation.
   * Team member: call AI pipeline, then publish ai.analysis.completed
   * or ai.moderation.flagged depending on the result.
   */
  @EventPattern('content.created')
  async handleContentCreated(@Payload() data: unknown): Promise<void> {
    this.logger.log('Received content.created event', { data });
  }

  /**
   * Content was updated — re-run analysis on the new version.
   * Team member: same pipeline as content.created but update
   * existing analysis record instead of creating a new one.
   */
  @EventPattern('content.updated')
  async handleContentUpdated(@Payload() data: unknown): Promise<void> {
    this.logger.log('Received content.updated event', { data });
  }

  /**
   * Admin or system requested re-analysis of existing content.
   * Team member: fetch the content by ID and run the full pipeline.
   */
  @EventPattern('ai.reanalysis.requested')
  async handleReanalysisRequested(@Payload() data: unknown): Promise<void> {
    this.logger.log('Received ai.reanalysis.requested event', { data });
  }
}
