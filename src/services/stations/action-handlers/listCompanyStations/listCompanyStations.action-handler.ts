import { ActionSchema, Context } from 'moleculer';

import { listCompanyStationsParamsSchema } from './listCompanyStations.params-schema';
import { beforeActionHandler } from './before.hook';

export const listCompanyStations: ActionSchema = {
  params: listCompanyStationsParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(ctx: Context<{ id: number; }>) {
    const { id } = ctx.params;

    return this.listCompanyStations(id);
  },
};
