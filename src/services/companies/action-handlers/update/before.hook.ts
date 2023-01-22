import { Context } from 'moleculer';

import { checkId } from '../../../../globalHelpers';
import { UpdateHandlerParamsType } from './update.handler-params.type';
import { checkParentId, checkParentIdEqualTo } from '../helpers';

export const beforeActionHandler = (ctx: Context<UpdateHandlerParamsType>) => {
  const { id, parentId } = ctx.params;

  checkId(id);
  if (!parentId) {
    checkParentId(parentId);
    checkParentIdEqualTo(id, parentId);
  }
};
