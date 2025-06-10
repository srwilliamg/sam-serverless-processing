import {
  DeleteMessageCommand,
  SQSClient,
  SendMessageCommand,
  SendMessageRequest,
  SendMessageResult,
} from '@aws-sdk/client-sqs';

import { IQueueService } from '../interfaces';
import { isTest } from '../constants';

const API_VERSION = '2012-11-05';
const REGION = process.env.REGION || 'us-east-1';

export class QueueService implements IQueueService {
  private client = new SQSClient({ region: REGION, apiVersion: API_VERSION });

  deleteMessage = (receiptHandle: string, sqsQueueUrl: string) => {
    if (isTest) return Promise.resolve(null);
    const command = new DeleteMessageCommand({
      QueueUrl: sqsQueueUrl,
      ReceiptHandle: receiptHandle,
    });

    return this.client.send(command);
  };

  sendMessage = (data: SendMessageRequest): Promise<SendMessageResult | null> => {
    if (isTest) return Promise.resolve(null);
    return this.client.send(new SendMessageCommand(data));
  };
}
