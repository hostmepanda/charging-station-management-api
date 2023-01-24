import { ActionSchema, Context } from 'moleculer';

export const listRecordsByStationId: ActionSchema = {
  async handler(ctx: Context<{ id: number | string; }>) {
    const { id } = ctx.params;
    return this.listRecordsByStationId(id);
  },
};
