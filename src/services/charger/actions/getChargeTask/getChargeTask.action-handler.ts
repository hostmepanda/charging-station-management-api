import { ActionSchema, Context } from 'moleculer';

export const getChargeTask: ActionSchema = {
  async handler(ctx: Context<{ id: string; }>) {
    const { id: taskId } = ctx.params;

  },
};
