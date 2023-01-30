import { CHANNELS } from './rabbitmq/channel';
import { consumerConfig, publishersConfig } from './rabbitmq/queue';
import { EXCHANGES } from './rabbitmq/exchange';

const QUEUES = {
  CONSUMER: consumerConfig,
  PUBLISHER: publishersConfig,
};

export { QUEUES, EXCHANGES, CHANNELS };
