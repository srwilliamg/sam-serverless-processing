import { NotificationService } from './notification';
import { QueueService } from './queue';

export const resourceFactory = {
  queueService: () => new QueueService(),
  notificationService: () => new NotificationService(),
};
