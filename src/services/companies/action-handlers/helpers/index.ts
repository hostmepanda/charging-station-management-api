import Moleculer from 'moleculer';
import ValidationError = Moleculer.Errors.ValidationError;

import { Id } from '../../../../globalHelpers';

type ParentId = string | number | undefined;

export const checkParentId = (parentId: ParentId) => {
  if (!parentId) {
    return undefined;
  }
  const isParentIdInvalidNumber = isNaN(Number(parentId));

  if (parentId && isParentIdInvalidNumber) {
    throw new ValidationError('parentId should be a valid number');
  }
};

export const checkParentIdEqualTo = (id: Id, parentId: ParentId) => {
  if (!parentId) {
    return undefined;
  }
  const idEqualsParentId = Number(id) === Number(parentId);

  if (idEqualsParentId) {
    throw new ValidationError('Company cannot be set as parent company to itself');
  }
};
