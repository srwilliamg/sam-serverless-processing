import { INotificationService, IQueueService } from '../interfaces';
import { PublishCommand, PublishCommandInput, PublishCommandOutput, SNSClient } from '@aws-sdk/client-sns';

import { isTest } from '../constants';

const API_VERSION = '2012-11-05';
const REGION = process.env.REGION || 'us-east-1';

export class NotificationService implements INotificationService {
  private client = new SNSClient({ region: REGION, apiVersion: API_VERSION });

  publish = (data: PublishCommandInput): Promise<PublishCommandOutput | null> => {
    if (isTest) return Promise.resolve(null);
    return this.client.send(new PublishCommand(data));
  };
}
