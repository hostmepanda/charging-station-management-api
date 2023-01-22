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
