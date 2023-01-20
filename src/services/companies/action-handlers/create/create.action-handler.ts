import { ActionSchema, Context, ServiceSchema } from 'moleculer';
import { CreateParamsSchema } from './create.params-schema';
import { CreateHandlerParamsType } from './create.handler-params.type';

export const CreateActionHandler: ActionSchema = {
  rest: 'POST /',
  params: CreateParamsSchema,
  async handler(this: ServiceSchema, ctx: Context<CreateHandlerParamsType>) {
    const { name } = ctx.params;

    return this.create({ name });
  },
};
