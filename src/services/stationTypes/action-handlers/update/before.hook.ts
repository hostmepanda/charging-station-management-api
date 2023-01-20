import Moleculer, { Context } from 'moleculer';

import { UpdateHandlerParamsType } from './update.handler-params.type';
import ValidationError = Moleculer.Errors.ValidationError;

export const beforeActionHandler = (ctx: Context<UpdateHandlerParamsType>) => {
  const { id, maxPower } = ctx.params;

  const idNotNumber = isNaN(Number(id));
  const maxPowerNotNumber = isNaN(Number(maxPower));

  if (idNotNumber) {
    throw new ValidationError('id should be a valid number');
  }
  if (maxPowerNotNumber) {
    throw new ValidationError('maxPower should be a valid number');
  }
};
