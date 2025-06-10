import {
  ListTopicsCommand,
  ListTopicsCommandInput,
  ListTopicsCommandOutput,
  PublishCommand,
  PublishCommandInput,
  PublishCommandOutput,
  SNSClient,
} from '@aws-sdk/client-sns';

import { INotificationService } from '../interfaces';
import { isTest } from '../constants';

const API_VERSION = '2012-11-05';
const REGION = process.env.REGION || 'us-east-1';

export class NotificationService implements INotificationService {
  private client = new SNSClient({ region: REGION, apiVersion: API_VERSION });

  list = (data: ListTopicsCommandInput): Promise<ListTopicsCommandOutput | null> => {
    if (isTest) return Promise.resolve(null);
    return this.client.send(new ListTopicsCommand(data));
  };

  publish = (data: PublishCommandInput): Promise<PublishCommandOutput | null> => {
    if (isTest) return Promise.resolve(null);
    return this.client.send(new PublishCommand(data));
  };
}
