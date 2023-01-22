import Moleculer, { Context } from 'moleculer';

import ValidationError = Moleculer.Errors.ValidationError;

export type Id = string | number;

export const checkId = (id: Id) => {
  const isIdInvalidNumber = isNaN(Number(id));

  if (isIdInvalidNumber) {
    throw new ValidationError('id should be a valid number');
  }
};

export const throwIfCompanyIdNotExist = async function (ctx: Context, companyId: number | string) {
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

export const throwIfCompanyHasChildren = async (ctx: Context, companyId: string | number) => {
  try {
    const companyChildren: {
      id: number;
      name: string;
      parent_company_id?: number;
    }[] = await ctx.broker.call('v1.companies.listChildren', { id: Number(companyId) });

    if (companyChildren.length > 0) {
      ctx.broker.logger.error(
        'Can not process the operation, company has a child or children',
        { companyId, childrenCount: companyChildren.length },
      );
      throw new ValidationError(
        'Can not process the operation, company has one or several dependent companies'
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

export const throwIfCompanyHasStations = async (ctx: Context, companyId: string | number) => {
  try {
    const companyStations: {
      id: number;
      name: string;
      company_id: number;
      station_type_id: number;
    }[] = await ctx.broker.call('v1.stations.listCompanyStations', { id: Number(companyId) });

    if (companyStations.length > 0) {
      ctx.broker.logger.error(
        'Can not process the operation, company has one or several stations',
        { companyId, stationsCount: companyStations.length },
      );
      throw new ValidationError(
        'Can not process the operation, company has one or several stations'
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
