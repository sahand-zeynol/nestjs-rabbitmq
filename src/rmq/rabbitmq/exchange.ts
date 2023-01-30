// import { configService } from 'config/config.service';
import { ExchangeType } from '../types/exchange.types';

// const postfix = configService.getValue('RABBITMQ_POSTFIX');
const postfix = '';

export const EXCHANGES = {
  BUNNY: {
    name: `bunny_delay_${postfix}`,
    type: ExchangeType.DELAYED,
    headers: { durable: true, arguments: { 'x-delayed-type': 'direct' } },
  },
  SINGLE_ACTIVE: {
    name: `singleActive_${postfix}`,
    type: ExchangeType.DIRECT,
    headers: { durable: true, arguments: { 'x-single-active-consumer': true } },
  },
};
