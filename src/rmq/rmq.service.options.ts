import { IChannel } from './interfaces/channel.interface';
import { IExchange } from './interfaces/exchange.interface';
import { IPublish } from './interfaces/publishOption.interface';
import { IQueue } from './interfaces/queue.interface';

export interface IRMQOptions {
  url: string;
  channels: { [key: string]: IChannel };
  exchanges: { [key: string]: IExchange };
  queues: { [key: string]: IQueue };
  consumers: { [key: string]: IPublish };
  publishers: { [key: string]: IPublish };
}
