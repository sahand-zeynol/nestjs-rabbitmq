## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository.

[RabbitMQ](https://www.rabbitmq.com/#featuress) is the most widely-deployed open-source and lightweight message broker which supports multiple messaging protocols.

# Basic documentation

## rabbitmq with Docker

With the docker-compose.yml file, we can easily spin up a RabbitMQ server with our customized definitions and configurations.

```bash
$ docker-compose up
```

or in new version of dockers use:

```bash
$ docker compose up
```

## install rabbitmq_delayed_message_exchange in Docker

```bash
# in Docker
apt update
apt install wget
cd /opt/rabbitmq/plugins
wget https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.11.1/rabbitmq_delayed_message_exchange-3.11.1.ez
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

This tuturial can grow thanks to NestJS users. If you'd like to join me, please send PR to complete.

## Stay in touch

- Author - [sahand-zeynol](https://github.com/sahand-zeynol)
