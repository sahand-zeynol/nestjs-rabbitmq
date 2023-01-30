import { IsNotEmpty, IsString } from 'class-validator';

export class QueueDto {
  @IsNotEmpty()
  QUEUE_NAME: string;

  @IsString()
  CHANNEL_NAME: string;
}
