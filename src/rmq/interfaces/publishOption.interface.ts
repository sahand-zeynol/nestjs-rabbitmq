import { IQueue } from './queue.interface';
import { Options } from 'amqplib';

export interface IQueueWithExchange extends Options.Publish {
  delayTime?: number;
}

export interface IPublish {
  QUEUE: IQueue;
  CHANNEL_NAME: string;
}
