import { ActionSchema, Context } from 'moleculer';

import { GetHandlerParamsType } from './get.handler-params.type';
import { getParamsSchema } from './get.params-schema';
import { beforeActionHandler } from './before.hook';

export const get: ActionSchema = {
  params: getParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(ctx: Context<GetHandlerParamsType>) {
    const { id } = ctx.params;

    return this.getCompany({ id: Number(id) });
  },
};
