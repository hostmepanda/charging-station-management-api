import Moleculer, { Context } from 'moleculer';
import { GetHandlerParamsType } from './get.handler-params.type';
import ValidationError = Moleculer.Errors.ValidationError;

export const beforeActionHandler = (ctx: Context<GetHandlerParamsType>) => {
  const { id } = ctx.params;

  const notValidNumber = isNaN(Number(id));

  if (notValidNumber) {
    throw new ValidationError('id should be a valid number');
  }
};
