import { Context } from 'moleculer';

import { CreateHandlerParamsType } from './create.handler-params.type';
import { checkCompanyId, checkStationTypeId } from '../helpers';

export const beforeActionHandler = (ctx: Context<CreateHandlerParamsType>) => {
  const { companyId, stationTypeId } = ctx.params;

  checkCompanyId(companyId);
  checkStationTypeId(stationTypeId);
};
