import { Context } from 'moleculer';

import { throwIfCompanyIdNotExist } from '../../../../globalHelpers';

import { CreateHandlerParamsType } from './create.handler-params.type';
import {
  checkCompanyId,
  checkStationTypeId,
  throwIfStationTypeIdNotExist,
} from '../../helpers';

export async function beforeActionHandler(ctx: Context<CreateHandlerParamsType>) {
  const { companyId, stationTypeId } = ctx.params;

  checkCompanyId(companyId);
  checkStationTypeId(stationTypeId);

  await throwIfCompanyIdNotExist(ctx, companyId);
  await throwIfStationTypeIdNotExist(ctx, stationTypeId);
}
