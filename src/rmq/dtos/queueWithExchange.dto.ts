import { IsObject } from 'class-validator';
import { ExchangeDto } from './exchange.dto';
import { QueueDto } from './queue.dto';

export class QueueWithExchangeDto extends QueueDto {
  @IsObject()
  EXCHANGE: ExchangeDto;

  @IsObject()
  HEADERS: object;
}
