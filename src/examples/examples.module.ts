import { Module } from '@nestjs/common';
import { BunnyDelayHandler } from './bunny-delay.consumer.service';
import { BunnyDelayPublisher } from './bunny-delay.publisher.service';

@Module({
  imports: [],
  providers: [BunnyDelayHandler, BunnyDelayPublisher],
  exports: [BunnyDelayHandler],
})
export class ExamplesModule {}
