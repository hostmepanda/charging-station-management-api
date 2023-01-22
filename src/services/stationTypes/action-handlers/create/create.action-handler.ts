import { ActionSchema, Context, ServiceSchema } from 'moleculer';

import { CreateParamsSchema } from './create.params-schema';
import { CreateHandlerParamsType } from './create.handler-params.type';
import { beforeActionHandler } from './before.hook';

export const create: ActionSchema = {
  params: CreateParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(this: ServiceSchema, ctx: Context<CreateHandlerParamsType>) {
    const { name, maxPower } = ctx.params;

    return this.createStationType({ name, maxPower });
  },
};
