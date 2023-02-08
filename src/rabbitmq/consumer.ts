import { IPublish } from 'nestjs-rabbitmq-sdk';
import { channels } from './channel';
import { queues } from './queue';

export const consumers: { [key: string]: IPublish } = {
  ERRORS: {
    QUEUE: queues.ERRORS,
    CHANNEL_NAME: channels.default.name,
  },
  UNHANDLED_EXCEPTION_QUEUE: {
    QUEUE: queues.UNHANDLED_EXCEPTION_QUEUE,
    CHANNEL_NAME: channels.default.name,
  },
};
