import Moleculer, { Context } from 'moleculer';

import ValidationError = Moleculer.Errors.ValidationError;
import { CreateHandlerParamsType } from './create.handler-params.type';

export const beforeActionHandler = (ctx: Context<CreateHandlerParamsType>) => {
  const { maxPower } = ctx.params;
  const notValidNumber = isNaN(Number(maxPower));

  if (notValidNumber) {
    throw new ValidationError('maxPower should be a valid number');
  }
};
