import { ActionSchema, Context, ServiceSchema } from 'moleculer';

import { CreateParamsSchema } from './create.params-schema';
import { CreateHandlerParamsType } from './create.handler-params.type';
import { beforeActionHandler } from './before.hook';

export const CreateActionHandler: ActionSchema = {
  rest: 'POST /',
  params: CreateParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(this: ServiceSchema, ctx: Context<CreateHandlerParamsType>) {
    const { name, maxPower } = ctx.params;

    return this.createStationType({ name, maxPower });
  },
};