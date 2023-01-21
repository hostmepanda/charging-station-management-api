import { ActionSchema, Context, ServiceSchema } from 'moleculer';
import { CreateParamsSchema } from './create.params-schema';
import { CreateHandlerParamsType } from './create.handler-params.type';

export const CreateActionHandler: ActionSchema = {
  rest: 'POST /',
  params: CreateParamsSchema,
  async handler(this: ServiceSchema, ctx: Context<CreateHandlerParamsType>) {
    const { name, parentId } = ctx.params;

    const createParams = {
      name,
      ...(parentId ? { parentId } : undefined),
    };

    return this.createCompany(createParams);
  },
};
