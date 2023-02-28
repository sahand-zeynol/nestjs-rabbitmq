import { Module } from '@nestjs/common';
import { ConsumersHandler } from './bunny-delay.consumer.service';
import { BunnyDelayPublisher } from './bunny-delay.publisher.service';
import { SimplePublisher } from './simple.publisher.service';

@Module({
  imports: [],
  providers: [ConsumersHandler, BunnyDelayPublisher, SimplePublisher],
  exports: [],
})
export class ExamplesModule {}
