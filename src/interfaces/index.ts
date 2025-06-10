import { DeleteMessageCommandOutput, SendMessageRequest, SendMessageResult } from '@aws-sdk/client-sqs';
import {
  ListTopicsCommandInput,
  ListTopicsCommandOutput,
  PublishCommandInput,
  PublishCommandOutput,
} from '@aws-sdk/client-sns';

import { Context } from 'vm';
import { resourceFactory } from '../utils/resource-factory';

export interface IQueueService {
  sendMessage(data: SendMessageRequest): Promise<SendMessageResult | null>;
  deleteMessage(receiptHandle: string, sqsQueueUrl: string): Promise<DeleteMessageCommandOutput | null>;
}

export interface INotificationService {
  publish(data: PublishCommandInput): Promise<PublishCommandOutput | null>;
  list(data: ListTopicsCommandInput): Promise<ListTopicsCommandOutput | null>;
}
export type IResource = IQueueService | INotificationService;
export type ExtractProperties<T> = T extends Record<infer K, () => any> ? K : never;
export type ISelectableResource = ExtractProperties<typeof resourceFactory>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IHandler<Event = any, TResult = any> = (
  event: Event,
  context: Context,
  // callback: Callback<TResult>,
  data: {
    queueService?: IQueueService;
    notificationService?: INotificationService;
  },
) => void | Promise<TResult>;
