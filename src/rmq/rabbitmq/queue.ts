// import { configService } from 'config/config.service';
import { getPropertyName } from '../helpers';
import { CHANNELS } from './channel';
import { EXCHANGES } from './exchange';

// const postfix = configService.getValue('RABBITMQ_POSTFIX');
const postfix = '';

const publishersConfig = {
  ERRORS: {
    QUEUE_NAME: `errors_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
  },
  UNHANDLED_EXCEPTION_QUEUE: {
    QUEUE_NAME: `unhandledExceptionEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
  },
  RESEND_ALARM_SMS_EVENT: {
    QUEUE_NAME: `resendAlarmAndSmsEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SCHEDULER_TIME_PERIOD_EVENT: {
    QUEUE_NAME: `SchedulerTimePeriodEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  TRANSACTION_INQUIRY_EVENT: {
    QUEUE_NAME: `transactionInquiryEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SEND_SMS_EVENT: {
    QUEUE_NAME: `sendSmsEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CREATE_PAYMENT_FROM_FIN_PAYMENT_EVENT: {
    QUEUE_NAME: `createPaymentFromFinEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CHECK_CREATE_PAY_FINISHED_EVENT: {
    QUEUE_NAME: `checkCreatePayFinished_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SEND_ALARM_EVENT: {
    QUEUE_NAME: `sendAlarmEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  EXPIRED_OTP_CODE_EVENT: {
    QUEUE_NAME: `expiredOtpCodeEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CREATE_PAYMENT_DESTINATION_EVENT: {
    QUEUE_NAME: `createPaymentDestinationEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  REVALIDATE_PAYMENTS_EVENT: {
    QUEUE_NAME: `revalidate_payments_event_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CHECK_REVALIDATE_PAYMENTS_IN_PROGRESS_EVENT: {
    QUEUE_NAME: `checkRevalidationInProgress_event_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CREATE_GROUP_PAYMENT_EVENT: {
    QUEUE_NAME: `createGroupPaymentEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CHUNK_PAYMENT_TRANSFER_EVENT: {
    QUEUE_NAME: `chunkPaymentTransferEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SEND_PAYA_PAYMENT_TO_SHAHR_BANK_EVENT: {
    QUEUE_NAME: `sendPayaPaymentToShahrBankEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SEND_INTERBANK_PAYMENT_TO_SHAHR_BANK_EVENT: {
    QUEUE_NAME: `sendInterBankPaymentToShahrBankEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SEND_SATNA_PAYMENT_TO_YAGHUT_EVENT: {
    QUEUE_NAME: `sendSatnaPaymentToYaghutEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  PAYMENT_FINISHES: {
    QUEUE_NAME: `payment_finishes_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.SINGLE_ACTIVE,
    HEADERS: { durable: true, arguments: { 'x-single-active-consumer': true } },
  },
  SCHEDULER_TIME_REVIEW_EVENT: {
    QUEUE_NAME: `SchedulerTimeReviewEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  TRANSACTION_INQUIRY_FOR_SHAHR_PAYA_EVENT: {
    QUEUE_NAME: `transactionInquiryShahrPayaEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SATNA_TRANSACTION_REPORT_EVENT: {
    QUEUE_NAME: `satnaTransactionReportEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.confirmed),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
};

const consumerConfig = {
  SCHEDULER_TIME_REVIEW_EVENT: {
    QUEUE_NAME: `SchedulerTimeReviewEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SCHEDULER_TIME_PERIOD_EVENT: {
    QUEUE_NAME: `SchedulerTimePeriodEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  TRANSACTION_INQUIRY_EVENT: {
    QUEUE_NAME: `transactionInquiryEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  RESEND_ALARM_SMS_EVENT: {
    QUEUE_NAME: 'resendAlarmAndSmsEvent_test',
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  EXPIRED_OTP_CODE_EVENT: {
    QUEUE_NAME: `expiredOtpCodeEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CREATE_GROUP_PAYMENT_EVENT: {
    QUEUE_NAME: `createGroupPaymentEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CREATE_PAYMENT_DESTINATION_EVENT: {
    QUEUE_NAME: `createPaymentDestinationEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SEND_INTERBANK_PAYMENT_TO_SHAHR_BANK_EVENT: {
    QUEUE_NAME: `sendInterBankPaymentToShahrBankEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CHUNK_PAYMENT_TRANSFER_EVENT: {
    QUEUE_NAME: `chunkPaymentTransferEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SEND_PAYA_PAYMENT_TO_SHAHR_BANK_EVENT: {
    QUEUE_NAME: `sendPayaPaymentToShahrBankEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  TRANSACTION_INQUIRY_FOR_SHAHR_PAYA_EVENT: {
    QUEUE_NAME: `transactionInquiryShahrPayaEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SEND_SATNA_PAYMENT_TO_YAGHUT_EVENT: {
    QUEUE_NAME: `sendSatnaPaymentToYaghutEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  SATNA_TRANSACTION_REPORT_EVENT: {
    QUEUE_NAME: `satnaTransactionReportEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CHECK_CREATE_PAY_FINISHED_EVENT: {
    QUEUE_NAME: `checkCreatePayFinished_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CREATE_PAYMENT_FROM_FIN_PAYMENT_EVENT: {
    QUEUE_NAME: `createPaymentFromFinEvent_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  REVALIDATE_PAYMENTS_EVENT: {
    QUEUE_NAME: `revalidate_payments_event_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
  CHECK_REVALIDATE_PAYMENTS_IN_PROGRESS_EVENT: {
    QUEUE_NAME: `checkRevalidationInProgress_event_${postfix}`,
    CHANNEL_NAME: getPropertyName(CHANNELS, (o) => o.default),
    EXCHANGE: EXCHANGES.BUNNY,
    HEADERS: { durable: true },
  },
};

export { publishersConfig, consumerConfig };
