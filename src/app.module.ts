import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import * as RMQConfig from './rabbitmq/rabbitmq.config';
import { RmqModule } from 'nestjs-rabbitmq-sdk';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // .env.development
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
      }),
    }),
    RmqModule.forRoot(RMQConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
