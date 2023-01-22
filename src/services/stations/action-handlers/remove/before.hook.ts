import { Context } from 'moleculer';
import { RemoveHandlerParamsType } from './remove.handler-params.type';

import { checkId } from '../../../../globalHelpers';

export const beforeActionHandler = (ctx: Context<RemoveHandlerParamsType>) => {
  const { id } = ctx.params;

  checkId(id);
};
