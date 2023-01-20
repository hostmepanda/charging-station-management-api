import { ActionSchema, Context } from 'moleculer';

import { removeParamsSchema } from './remove.params-schema';
import { RemoveHandlerParamsType } from './remove.handler-params.type';
import { beforeActionHandler } from './before.hook';

export const RemoveActionHandler: ActionSchema = {
  rest: 'DELETE /:id',
  params: removeParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(ctx: Context<RemoveHandlerParamsType>) {
    const { id } = ctx.params;
    return this.deleteStationType({ id: Number(id) });
  },
};
