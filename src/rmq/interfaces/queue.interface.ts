export interface IQueueHeaders {
  durable: boolean;
}

export interface IQueueSingleActiveHeaders extends IQueueHeaders {
  arguments: { 'x-single-active-consumer': boolean };
}
