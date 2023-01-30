export interface IExchangeHeaders {
  durable: boolean;
}

export interface ISingleActiveExchangeHeaders extends IExchangeHeaders {
  arguments: { 'x-single-active-consumer': boolean };
}

export interface IBunnyExchangeHeaders extends IExchangeHeaders {
  arguments: { 'x-delayed-type': string };
}
