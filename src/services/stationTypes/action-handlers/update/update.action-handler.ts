import { ActionSchema, Context } from 'moleculer';

import { UpdateHandlerParamsType } from './update.handler-params.type';
import { beforeActionHandler } from './before.hook';
import { updateParamsSchema } from './update.params-schema';

export const update: ActionSchema = {
  params: updateParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(ctx: Context<UpdateHandlerParamsType>) {
    const { id, name, maxPower } = ctx.params;
    return this.updateStationType({ id: Number(id), name, maxPower });
  },
};
