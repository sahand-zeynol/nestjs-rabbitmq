import { IChannel } from 'nestjs-rabbitmq-sdk';

export const channels: { [key: string]: IChannel } = {
  default: {
    name: 'default',
    type: 'consumer',
    prefetch: 1,
  },
  confirmed: {
    name: 'confirmed',
    type: 'publisher',
  },
};
