import { Channel, ConfirmChannel, connect, Connection } from 'amqplib';
import { v4 as uuid } from 'uuid';
import { QueueDto, QueueWithExchangeDto } from './dtos';
// import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CHANNELS, EXCHANGES, QUEUES } from './rabbitmq.config';
import { ChannelType } from './types/channel.types';
import { IQueueWithExchange } from './interfaces/publishOption.interface';
import { delay } from './helpers';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './interfaces/EnvironmentVariables.interface';

@Injectable()
export class RmqService {
  private connectionRetry: boolean;

  private connection: Connection;

  private channels: { [key: string]: Channel | ConfirmChannel } = {};

  private handlers = {};

  /**
   * Constructor
   * @param cacheManager
   */
  constructor(
    // @Inject(CACHE_MANAGER) private cacheManager: Cache
    private configService: ConfigService<EnvironmentVariables>,
  ) {
    const port = this.configService.get('PORT', { infer: true });
    console.log(port);
  }

  /**
   * Connect
   * @param rabbitmqUrl
   */
  async connect(rabbitmqUrl: string = process.env.RABBITMQ_URL) {
    try {
      if (this.connection) return this.connection;
      this.connection = await connect(rabbitmqUrl);
      this.connectionRetry = true;

      // On error
      this.connection.on('error', (error) => {
        if (error.message !== 'Connection closing') {
          console.error('[AMQP] conn error =>', error.message);
        }
      });

      // On close
      this.connection.on('close', async () => {
        if (!this.connectionRetry) {
          return;
        }
        console.warn('[AMQP] reconnecting');
        await this.retryConnect();
      });

      // Initialize
      await this.init();
    } catch (error) {
      console.error('[AMQP] disconnected, retrying... =>', error.message);
      await this.retryConnect();
    }
  }

  /**
   * Close connection
   */
  async closeConnection() {
    if (!this.connection) {
      return true;
    }
    this.connectionRetry = false;
    return this.connection.close();
  }

  /**
   * Initialize the RabbitMQ channels and consumers
   */
  private async init() {
    try {
      await this.createChannels();
      for (const queue in QUEUES.CONSUMER) {
        await this.channelAssertQueue(
          QUEUES.CONSUMER[queue] as QueueWithExchangeDto,
        );
        await this.consumer(QUEUES.CONSUMER[queue]);
      }
      for (const queue in QUEUES.PUBLISHER) {
        await this.channelAssertQueue(
          QUEUES.PUBLISHER[queue] as QueueWithExchangeDto,
        );
      }
    } catch (error) {
      console.error('Error while initializing =>', error.message);
    }
  }

  /**
   * create all channels
   */
  private async createChannels() {
    for (const key in CHANNELS) {
      if (CHANNELS[key].type === ChannelType.CONSUMER) {
        this.channels[key] = await this.createChannel(key);
      } else if (CHANNELS[key].type === ChannelType.PUBLISHER) {
        this.channels[key] = await this.createConfirmedChannel(key);
      }
    }
  }

  /**
   * Retry to connect to the message broker
   */
  private async retryConnect() {
    try {
      await delay(1000);
      await this.connect();
    } catch (error) {
      console.error('Error while retrying =>', error.message);
    }
  }

  /**
   * Create confirmed channel
   * @param channelName
   */
  private async createConfirmedChannel(channelName): Promise<ConfirmChannel> {
    try {
      if (this.channels[channelName])
        return this.channels[channelName] as ConfirmChannel;

      const confirmedChannel = await this.connection.createConfirmChannel();

      // On error
      confirmedChannel.on('error', (error) => {
        console.error('[AMQP] confirmed channel error =>', error.message);
      });

      // On close
      confirmedChannel.on('close', () => {
        console.error('[AMQP] confirmed channel closed');
      });
      // await confirmedChannel.waitForConfirms();
      return confirmedChannel;
    } catch (error) {
      console.error('[AMQP] confirmed channel error =>', error.message);
    }
  }

  /**
   * Create channel
   * @param channelName
   */
  private async createChannel(channelName): Promise<Channel> {
    try {
      if (this.channels[channelName]) return this.channels[channelName];
      const createdChannel = await this.connection.createChannel();

      createdChannel.prefetch(CHANNELS[channelName].prefetch);
      // On error
      createdChannel.on('error', (error) => {
        console.error(
          `[AMQP] channel ${channelName} error event =>`,
          error.message,
        );
      });

      // On close
      createdChannel.on('close', () => {
        console.log(`[AMQP] channel ${channelName} closed`);
      });
      return createdChannel;
    } catch (error) {
      console.error(`[AMQP] channel ${channelName} error =>`, error.message);
    }
  }

  /**
   * Channel assert exchange and queue and bind them
   * @param queue
   */
  private async channelAssertQueue(queue: QueueWithExchangeDto) {
    try {
      if (!queue.EXCHANGE || !queue.CHANNEL_NAME) {
        return;
      }
      const channel = this.channels[queue.CHANNEL_NAME];
      await channel.assertExchange(
        queue.EXCHANGE.name,
        queue.EXCHANGE.type,
        queue.EXCHANGE.headers,
      );
      await channel.assertQueue(queue.QUEUE_NAME, queue.HEADERS);
      await channel.bindQueue(
        queue.QUEUE_NAME,
        queue.EXCHANGE.name,
        queue.QUEUE_NAME,
      );
    } catch (error) {
      console.error('Channel assert queue error =>', error.message);
    }
  }

  /**
   * Decide way of sending message to rabbitMQ and publish
   * .If queue have exchange will send by publisher function
   * .If queue doesn't have exchange will send by sendToQueue function
   * @param queue
   * @param payload
   * @param delayTime
   */
  async publish(
    queue: QueueDto | QueueWithExchangeDto,
    payload,
    options?: object | IQueueWithExchange,
  ) {
    if (queue.hasOwnProperty('EXCHANGE')) {
      await this.publisher(
        queue as QueueWithExchangeDto,
        payload,
        (options as IQueueWithExchange)?.delayTime,
      );
    } else {
      await this.sendToQueue(queue, payload);
    }
  }

  /**
   * Directly send to queue without any exchange or rule
   * @param queue
   * @param payload
   */
  private async sendToQueue(queue: QueueDto, payload) {
    const confirmedChannel = this.channels[queue.CHANNEL_NAME];
    try {
      confirmedChannel.sendToQueue(
        queue.QUEUE_NAME,
        Buffer.from(JSON.stringify([payload])),
        {
          messageId: uuid(),
        },
        async (err) => {
          if (err)
            await confirmedChannel.sendToQueue(
              QUEUES.PUBLISHER.UNHANDLED_EXCEPTION_QUEUE.QUEUE_NAME,
              Buffer.from(
                JSON.stringify([
                  // new UnhandledException('ServiceBusService', 'sendToQueue', {
                  //   payload,
                  //   err,
                  // }),
                ]),
              ),
            );
        },
      );
    } catch (err) {
      await confirmedChannel.sendToQueue(
        QUEUES.PUBLISHER.UNHANDLED_EXCEPTION_QUEUE.QUEUE_NAME,
        Buffer.from(
          JSON.stringify([
            // new UnhandledException('ServiceBusService', 'sendToQueue', {
            //   payload,
            //   err,
            // }),
          ]),
        ),
      );
    }
  }

  /**
   * Publish
   * @param queue
   * @param payload
   * @param delayTime
   */
  private async publisher(queue: QueueWithExchangeDto, payload, delayTime = 0) {
    const confirmedChannel = this.channels[queue.CHANNEL_NAME];
    try {
      // Headers
      let headers: { [k: string]: any } = {};

      if (queue.EXCHANGE.type === EXCHANGES.BUNNY.type) {
        headers = { 'x-delay': delayTime };
      } else if (queue.EXCHANGE.type === EXCHANGES.SINGLE_ACTIVE.type) {
        headers = { 'x-single-active-consumer': true };
      }
      // Publish
      confirmedChannel.publish(
        queue.EXCHANGE.name,
        queue.QUEUE_NAME,
        Buffer.from(JSON.stringify([payload])),
        {
          messageId: uuid(),
          headers,
        },
        async (err) => {
          if (err)
            await confirmedChannel.sendToQueue(
              QUEUES.PUBLISHER.UNHANDLED_EXCEPTION_QUEUE.QUEUE_NAME,
              Buffer.from(
                JSON.stringify([
                  // new UnhandledException('ServiceBusService', 'publisher', {
                  //   payload,
                  //   err,
                  // }),
                ]),
              ),
            );
        },
      );
    } catch (err) {
      await confirmedChannel.sendToQueue(
        QUEUES.PUBLISHER.UNHANDLED_EXCEPTION_QUEUE.QUEUE_NAME,
        Buffer.from(
          JSON.stringify([
            // new UnhandledException('ServiceBusService', 'publisher', {
            //   payload,
            //   err,
            // }),
          ]),
        ),
      );
    }
  }

  /**
   * Consume
   * @param queue
   */
  private async consumer(queue: QueueDto) {
    try {
      console.log('CONSUMING....', queue.QUEUE_NAME);
      const channel = this.channels[queue.CHANNEL_NAME];
      await channel.consume(queue.QUEUE_NAME, async (result) => {
        const handler = this.handlers[queue.QUEUE_NAME];
        if (result === null || handler === undefined) {
          console.log(`no handler for ${queue.QUEUE_NAME} or result is null`);
          return;
        }

        try {
          const content = JSON.parse(result.content.toString())[0];
          await handler(content);
          await channel.ack(result);
        } catch (error) {
          // const consumeErrorCount = await this.cacheManager.get(
          //   result.properties.messageId,
          // );
          // if (consumeErrorCount > 5) {
          //   // todo: Review this part, check if we wait for result then something fucking bad happens in the consumer!!!
          //   await this.sendToQueue(QUEUES.PUBLISHER.ERRORS, result);
          //   await channel.ack(result);
          // } else {
          //   await this.cacheManager.set(
          //     result.properties.messageId,
          //     +consumeErrorCount + 1,
          //   );
          //   await channel.nack(result, false, false);
          // }
        }
      });
    } catch (error) {
      console.error('Consumer error =>', error.message);
    }
  }

  /**
   * Set handler for consumer
   * @param queue
   * @param callback
   */
  public on = (
    queue: QueueDto | QueueWithExchangeDto,
    callback: (result: any) => void,
  ) => {
    console.log(`new handler registered ${queue.QUEUE_NAME}`);
    this.handlers[queue.QUEUE_NAME] = callback;
  };
}
