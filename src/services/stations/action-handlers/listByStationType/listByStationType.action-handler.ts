import { ActionSchema, Context } from 'moleculer';
import { listByStationTypeParamsSchema } from './listByStationType.params-schema';
import { beforeActionHandler } from './before.hook';

export const listByStationType: ActionSchema = {
  params: listByStationTypeParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(ctx: Context<{ id: number; }>) {
    const { id } = ctx.params;

    return this.listByStationType(id);
  },
};
