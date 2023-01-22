import { ActionSchema, Context } from 'moleculer';

import { listChildrenStationsParamsSchema } from './listChildrenStations.params-schema';
import { beforeActionHandler } from './before.hook';

export const listChildrenStations:ActionSchema = {
  params: listChildrenStationsParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(ctx: Context<{ id: string | number}>) {
    const { id } = ctx.params;

    return this.listChildrenWithStations(Number(id));
  },
};
