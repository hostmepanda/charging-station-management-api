import Moleculer, { Context } from 'moleculer';

import { UpdateHandlerParamsType } from './update.handler-params.type';
import ValidationError = Moleculer.Errors.ValidationError;

export const beforeActionHandler = (ctx: Context<UpdateHandlerParamsType>) => {
  const { id } = ctx.params;

  const notValidNumber = isNaN(Number(id));

  if (notValidNumber) {
    throw new ValidationError('id should be a valid number');
  }
};
