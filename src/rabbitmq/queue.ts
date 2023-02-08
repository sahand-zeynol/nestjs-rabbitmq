import { IQueue } from 'nestjs-rabbitmq-sdk';
import { exchanges } from './exchange';
import * as dotenv from 'dotenv';
dotenv.config();

const postfix = process.env.RABBITMQ_POSTFIX;

export const queues: { [key: string]: IQueue } = {
  ERRORS: {
    QUEUE_NAME: `errors_${postfix}`,
    EXCHANGE: exchanges.BUNNY,
    HEADERS: { durable: true },
  },
  UNHANDLED_EXCEPTION_QUEUE: {
    QUEUE_NAME: `unhandledExceptionEvent_${postfix}`,
    EXCHANGE: exchanges.BUNNY,
    HEADERS: { durable: true },
  },
};
