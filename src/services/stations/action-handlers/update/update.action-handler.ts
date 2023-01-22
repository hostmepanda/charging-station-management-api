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
    const { companyId, id, name, stationTypeId } = ctx.params;
    const updateParams = {
      companyId: Number(companyId),
      id: Number(id),
      name,
      stationTypeId: Number(stationTypeId),
    };
    return this.updateStation(updateParams);
  },
};
