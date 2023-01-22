import Moleculer, { Context } from 'moleculer';

import ValidationError = Moleculer.Errors.ValidationError;

export const checkCompanyId = (companyId: string | number) => {
  const isCompanyIdInvalidNumber = isNaN(Number(companyId));

  if (isCompanyIdInvalidNumber) {
    throw new ValidationError('companyId should be a valid number');
  }
};

export const checkStationTypeId = (stationTypeId: string | number) => {
  const isStationTypeIdInvalidNumber = isNaN(Number(stationTypeId));

  if (isStationTypeIdInvalidNumber) {
    throw new ValidationError('stationTypeId should be a valid number');
  }
};

export const throwIfCompanyIdNotExist = async function (ctx: Context, companyId: number) {
  try {
    const foundCompany = await ctx.broker.call('v1.companies.get', { id: companyId });
    if (!foundCompany) {
      ctx.broker.logger.error(
        'Can not find company by its id',
        { companyId },
      );
      throw new ValidationError(
        `Provided companyId doesn't match any existing company`,
      );
    }
  } catch (error: unknown) {
    const caughtError = error as { type: string; message: string };

    if (caughtError?.type === 'VALIDATION_ERROR') {
      throw error;
    } else {
      throw new Moleculer.Errors.MoleculerError(
        `Error happened during processing the request`,
      );
    }
  }
};

export const throwIfStationTypeIdNotExist = async (ctx: Context, stationTypeId: number) => {
  try {
    const foundStationType = await ctx.broker.call('v1.stationTypes.get', { id: stationTypeId });

    if (!foundStationType) {
      ctx.broker.logger.error(
        'Can not find station type by provided id',
        { stationTypeId },
      );
      throw new ValidationError(
        `Provided stationTypeId doesn't match any existing station type`,
      );
    }
  } catch (error: unknown) {
    const caughtError = error as { type: string; message: string };

    if (caughtError?.type === 'VALIDATION_ERROR') {
      throw error;
    } else {
      throw new Moleculer.Errors.MoleculerError(
        `Error happened during processing the request`,
      );
    }
  }
};

