import Moleculer from 'moleculer';

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
