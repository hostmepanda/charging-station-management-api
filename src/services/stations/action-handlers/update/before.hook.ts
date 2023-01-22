import { Context } from 'moleculer';

import { checkId, throwIfCompanyIdNotExist } from '../../../../globalHelpers';
import { UpdateHandlerParamsType } from './update.handler-params.type';
import { checkCompanyId, checkStationTypeId, throwIfStationTypeIdNotExist } from '../helpers';

export const beforeActionHandler = async (ctx: Context<UpdateHandlerParamsType>) => {
  const { id, companyId, stationTypeId } = ctx.params;

  checkId(id);

  if (stationTypeId) {
    checkStationTypeId(stationTypeId);
    await throwIfStationTypeIdNotExist(ctx, stationTypeId);
  }

  if (companyId) {
    checkCompanyId(companyId);
    await throwIfCompanyIdNotExist(ctx, companyId);
  }
};
