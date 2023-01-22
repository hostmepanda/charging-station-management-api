import { Context } from 'moleculer';

import { GetHandlerParamsType } from './get.handler-params.type';
import { checkId } from '../../../../globalHelpers';

export const beforeActionHandler = (ctx: Context<GetHandlerParamsType>) => {
  const { id } = ctx.params;

  checkId(id);
};
