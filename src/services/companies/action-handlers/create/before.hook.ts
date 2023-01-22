import { Context } from 'moleculer';

import { CreateHandlerParamsType } from './create.handler-params.type';
import { checkParentId } from '../helpers';
import { throwIfCompanyIdNotExist } from '../../../../globalHelpers';

export const beforeActionHandler = async (ctx: Context<CreateHandlerParamsType>) => {
  const { parentId } = ctx.params;

  if (!parentId) {
    return undefined;
  }

  checkParentId(parentId);
  await throwIfCompanyIdNotExist(ctx, parentId);
};
