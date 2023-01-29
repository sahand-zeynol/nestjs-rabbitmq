import { ChannelDto } from '../dtos';
import { ChannelType } from '../types/channel.types';

export const CHANNELS: { [key: string]: ChannelDto } = {
  default: {
    type: ChannelType.CONSUMER,
    prefetch: 1,
  },
  confirmed: {
    type: ChannelType.PUBLISHER,
  },
};
