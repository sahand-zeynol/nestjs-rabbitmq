import { exchanges } from './exchange';
import { channels } from './channel';
import { consumers } from './consumer';
import { queues } from './queue';
import { publishers } from './publisher';

const url = process.env.RABBITMQ_URL;

export { url, exchanges, channels, queues, publishers, consumers };
