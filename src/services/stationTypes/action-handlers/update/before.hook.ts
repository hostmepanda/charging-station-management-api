import { Context } from 'moleculer';

import { checkId } from '../../../../globalHelpers';

import { UpdateHandlerParamsType } from './update.handler-params.type';
import { checkMaxPower } from '../../helpers';

export const beforeActionHandler = (ctx: Context<UpdateHandlerParamsType>) => {
  const { id, maxPower } = ctx.params;

  checkId(id);

  if (maxPower) {
    checkMaxPower(maxPower);
  }
};
