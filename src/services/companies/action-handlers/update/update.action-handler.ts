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
    const { id, name, parentId } = ctx.params;
    const updateParams = {
      id: Number(id),
      name,
      ...(parentId ? { parentId: Number(parentId) } : undefined),
    };

    return this.updateCompany(updateParams);
  },
};
