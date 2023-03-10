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
    let updateParentId;

    const isParentIdNull = parentId === 'null';
    const shouldUpdateParentId = isParentIdNull || parentId;

    if (shouldUpdateParentId && isParentIdNull) {
      updateParentId = { parentId: null };
    } else {
      updateParentId = { parentId: Number(parentId) };
    }

    const updateParams = {
      id: Number(id),
      name,
      ...(shouldUpdateParentId ? updateParentId : undefined),
    };

    return this.updateCompany(updateParams);
  },
};
