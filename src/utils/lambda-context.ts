import { IHandler, IResource, ISelectableResource } from '../interfaces';

import { Context } from 'aws-lambda';
import { resourceFactory } from './resource-factory';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lambdaContext = async <E = any>(
  event: E,
  context: Context,
  handler: IHandler,
  resources?: ISelectableResource[],
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // if (!connection) {
  //   connection = await DataSourceConfig.initialize();
  // }

  const tools: Record<string, IResource> = {};

  if (resources && resources.length > 0) {
    resources.map((resource) => {
      if (!resourceFactory[resource]) {
        throw new Error(`Resource ${resource} is not defined`);
      }

      tools[resource] = resourceFactory[resource]();
    });
  }

  return await handler(event, context, tools);
};

//typescript how to extract as a type the key of an object

// export type ExtractProperties<T> = T extends { [key: string]: infer U } ? U : never;
// export type ExtractProperties<T> = T extends Record<string, infer U> ? U : never;
