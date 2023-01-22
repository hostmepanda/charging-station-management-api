import { Context } from 'moleculer';

import { CreateHandlerParamsType } from './create.handler-params.type';
import { checkParentId } from '../helpers';

export const beforeActionHandler = (ctx: Context<CreateHandlerParamsType>) => {
  const { parentId } = ctx.params;

  checkParentId(parentId);
};
