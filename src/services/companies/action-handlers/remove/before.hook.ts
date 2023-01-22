import { Context } from 'moleculer';

import { checkId, throwIfCompanyHasChildren, throwIfCompanyHasStations } from '../../../../globalHelpers';

import { RemoveHandlerParamsType } from './remove.handler-params.type';

export const beforeActionHandler = async (ctx: Context<RemoveHandlerParamsType>) => {
  const { id } = ctx.params;

  checkId(id);
  await throwIfCompanyHasChildren(ctx, id);
  await throwIfCompanyHasStations(ctx, id);
};
