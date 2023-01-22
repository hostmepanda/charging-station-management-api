import Moleculer from 'moleculer';

import ValidationError = Moleculer.Errors.ValidationError;

export const checkMaxPower = (maxPower: string | number) => {
  const maxPowerNotNumber = isNaN(Number(maxPower));

  if (maxPowerNotNumber) {
    throw new ValidationError('maxPower should be a valid number');
  }
};
