import { Context, SQSEvent } from 'aws-lambda';

import { IHandler } from '../../interfaces';
import { lambdaContext } from '../../utils';

const LOG = '[SQS_Message_Processor]';

const processMessageHandler: IHandler<SQSEvent> = async (event, context) => {
  console.info(`${LOG}Processing SQS messages`, JSON.stringify(event), context);
  for (const record of event.Records) {
    console.info(`${LOG}Processing record`, JSON.stringify(record));
    const messageBody = JSON.parse(record.body);
    console.info(`${LOG}Message body`, messageBody);
  }

  console.info(`${LOG}Finished processing SQS messages`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SQS messages processed successfully',
    }),
  };
};

export const handler = async (event: SQSEvent, context: Context) => {
  console.info(`${LOG}event`, JSON.stringify(event), context);

  return await lambdaContext(event, context, processMessageHandler);
};
