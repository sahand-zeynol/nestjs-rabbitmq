import { IExchange } from '../rmq/interfaces/exchange.interface';

const postfix = process.env.RABBITMQ_POSTFIX;

export const exchanges: { [key: string]: IExchange } = {
  BUNNY: {
    name: `bunny_delay_${postfix}`,
    type: 'direct',
    headers: { durable: true, arguments: { 'x-delayed-type': 'direct' } },
  },
  SINGLE_ACTIVE: {
    name: `singleActive_${postfix}`,
    type: 'x-delayed-message',
    headers: { durable: true, arguments: { 'x-single-active-consumer': true } },
  },
};
