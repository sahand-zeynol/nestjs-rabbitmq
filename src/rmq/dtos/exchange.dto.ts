import { IsEnum, IsObject, IsString } from 'class-validator';
import { IBunnyExchangeHeaders, ISingleActiveExchangeHeaders } from '../interfaces/exchange.interface';
import { ExchangeType } from '../types/exchange.types';

export class ExchangeDto {
	@IsString()
	name: string;

	@IsEnum(ExchangeType)
	type: ExchangeType;

	@IsObject()
	headers: ISingleActiveExchangeHeaders | IBunnyExchangeHeaders;
}
