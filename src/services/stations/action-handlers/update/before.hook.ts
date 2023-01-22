import { Context } from 'moleculer';

import { checkId } from '../../../../globalHelpers';
import { UpdateHandlerParamsType } from './update.handler-params.type';

export const beforeActionHandler = (ctx: Context<UpdateHandlerParamsType>) => {
  const { id } = ctx.params;

  checkId(id);
};
