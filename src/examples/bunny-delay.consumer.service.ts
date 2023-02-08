import { Injectable } from '@nestjs/common';
import { RmqService } from 'nestjs-rabbitmq-sdk';
import { consumers } from '../rabbitmq/consumer';

@Injectable()
export class ConsumersHandler {
  constructor(private readonly rmqService: RmqService) {
    this.rmqService.on(consumers.ERRORS, async (result) => {
      console.log('BUNNY-DELAY consumed: ', result);
    });
    this.rmqService.on(consumers.SIMPLE, async (result) => {
      console.log('SIMPLE consumed: ', result);
    });
  }
}
