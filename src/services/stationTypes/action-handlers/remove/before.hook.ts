import { Context } from 'moleculer';

import { RemoveHandlerParamsType } from './remove.handler-params.type';

import { checkId } from '../../../../globalHelpers';
import { throwIfStationTypeBelongsToStation } from '../helpers';

export const beforeActionHandler = async (ctx: Context<RemoveHandlerParamsType>) => {
  const { id } = ctx.params;

  checkId(id);
  await throwIfStationTypeBelongsToStation(ctx, id);
};
