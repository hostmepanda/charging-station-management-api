import { ActionSchema, Context } from 'moleculer';

export const getChargeTask: ActionSchema = {
  async handler(ctx: Context<{ params: { id: string; } }>) {
    const { params: { id: taskId } } = ctx.params;

    return this.getTaskById(taskId);
  },
};
