import { exchanges } from './exchange';
import { channels } from './channel';
import { consumers } from './consumer';
import { queues } from './queue';
import { publishers } from './publisher';
import { IRMQOptions } from 'nestjs-rabbitmq-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.RABBITMQ_URL;
const isGlobal = true;

export const RMQConfig: IRMQOptions = {
  url,
  exchanges,
  channels,
  queues,
  publishers,
  consumers,
  isGlobal,
};
