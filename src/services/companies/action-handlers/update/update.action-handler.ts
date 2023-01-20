import { ActionSchema, Context } from 'moleculer';

import { UpdateHandlerParamsType } from './update.handler-params.type';
import { beforeActionHandler } from './before.hook';
import { updateParamsSchema } from './update.params-schema';

export const UpdateActionHandler: ActionSchema = {
  rest: 'PUT /:id',
  params: updateParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(ctx: Context<UpdateHandlerParamsType>) {
    const { id, name } = ctx.params;
    return this.updateCompany({ id: Number(id), name });
  },
};
