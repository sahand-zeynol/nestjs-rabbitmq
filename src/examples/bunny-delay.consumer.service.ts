import { Injectable } from '@nestjs/common';
import { RmqService } from 'nestjs-rabbitmq-sdk';
import { consumers } from '../rabbitmq/consumer';

@Injectable()
export class BunnyDelayHandler {
  constructor(private readonly rmqService: RmqService) {
    this.rmqService.on(consumers.ERRORS, async (result) => {
      console.log(result);
    });
  }
}
