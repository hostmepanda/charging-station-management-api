import { ActionSchema, Context } from 'moleculer';

export const listParents: ActionSchema = {
  async handler(ctx: Context<{ ids: (number| string)[] }>) {
    const { ids } = ctx.params;

    return this.listParentByChildIds(ids);
  },
};
