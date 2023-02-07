import { IChannel } from '../rmq/interfaces/channel.interface';

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
