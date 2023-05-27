import { Injectable, OnModuleInit } from '@nestjs/common';
import { RmqService } from 'nestjs-rabbitmq-sdk';
import { delay } from 'src/rmq/helpers';
import { publishers } from '../rabbitmq/publisher';

@Injectable()
export class BunnyDelayPublisher implements OnModuleInit {
  constructor(private readonly rmqService: RmqService) {}

  async onModuleInit() {
    await delay(5000);
    await this.rmqService.publish(publishers.BUNNY_DELAY, 'Bunny-delay', {
      delayTime: 5000,
    });
  }
}
