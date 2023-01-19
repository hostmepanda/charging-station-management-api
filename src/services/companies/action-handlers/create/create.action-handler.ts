import Moleculer, { ActionSchema, Context, ServiceSchema } from 'moleculer';
import { CreateParamsSchema } from './create.params-schema';
import { CreateHandlerParamsType } from './create.handler-params.type';
import ValidationError = Moleculer.Errors.ValidationError;

export const CreateActionHandler: ActionSchema = {
  rest: 'POST /',
  params: CreateParamsSchema,
  hooks: {
    before(ctx: Context<CreateHandlerParamsType>) {
      const { id } = ctx.params;
      const invalidNumber = isNaN(Number(id));

      if (invalidNumber) {
        throw new ValidationError(`id ${id} should be string of number value`);
      }
    },
  },
  async handler(this: ServiceSchema, ctx: Context<CreateHandlerParamsType>) {
    this.broker.logger.info('--ctx.params', ctx.params);
    const { id, name } = ctx.params;

    return this.create({ id: Number(id), name });
  },
};
