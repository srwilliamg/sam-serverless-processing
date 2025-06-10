import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { IHandler } from '../../interfaces';
import { lambdaContext } from '../../utils';

const LOG = 'endpoint-reveiver';
export const processEndpoint: IHandler = async (
  event: APIGatewayProxyEvent,
  _,
  { notificationService },
): Promise<APIGatewayProxyResult> => {
  const topic = process.env.SNS_TOPIC_ARN || undefined;
  console.log('🚀 ~ notificationService:', topic);

  if (!notificationService) {
    throw new Error('Notification service is not defined');
  }

  try {
    const responseSNS = await notificationService.publish({
      Subject: 'Notification from API Endpoint',
      Message: 'Hello from the notification service!',
      TopicArn: topic,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: responseSNS,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  // console.info(`${LOG}event`, event, context);

  return await lambdaContext(event, context, processEndpoint, ['notificationService']);
};
