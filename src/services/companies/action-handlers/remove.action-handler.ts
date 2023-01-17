import { ActionSchema, Context } from 'moleculer';

export const RemoveActionHandler: ActionSchema = {
  rest: 'DELETE /:id',
  async handler(ctx: Context) {},
};
