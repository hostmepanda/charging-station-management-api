import Moleculer from 'moleculer';

import ValidationError = Moleculer.Errors.ValidationError;

export type Id = string | number;

export const checkId = (id: Id) => {
  const isIdInvalidNumber = isNaN(Number(id));

  if (isIdInvalidNumber) {
    throw new ValidationError('id should be a valid number');
  }
};
