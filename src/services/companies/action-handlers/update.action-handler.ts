import { ActionSchema, Context } from 'moleculer';

export const UpdateActionHandler: ActionSchema = {
  rest: 'PUT /:id',
  async handler(ctx: Context) {},
};
