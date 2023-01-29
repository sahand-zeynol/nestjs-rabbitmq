import { IsEnum, IsOptional } from 'class-validator';
import { ChannelType } from '../types/channel.types';

export class ChannelDto {
	@IsOptional()
	prefetch?: number;

	@IsEnum(ChannelType)
	type: ChannelType;
}
