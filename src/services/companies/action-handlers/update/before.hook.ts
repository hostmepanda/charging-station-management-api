import Moleculer, { Context } from 'moleculer';
import { UpdateHandlerParamsType } from './update.handler-params.type';
import ValidationError = Moleculer.Errors.ValidationError;

const checkId = (id: string | number) => {
  const notValidId = isNaN(Number(id));

  if (notValidId) {
    throw new ValidationError('id should be a valid number');
  }
};
const checkParentId = (id: string | number, parentId: string | number | undefined) => {
  if (!parentId) {
    return undefined;
  }
  const notValidParentId = isNaN(Number(parentId));
  const idEqualsParentId = Number(id) === Number(parentId);

  if (parentId && notValidParentId) {
    throw new ValidationError('parentId should be a valid number');
  }

  if (idEqualsParentId) {
    throw new ValidationError('Company cannot be set as parent company to itself');
  }
};

export const beforeActionHandler = (ctx: Context<UpdateHandlerParamsType>) => {
  const { id, parentId } = ctx.params;

  checkId(id);
  checkParentId(id, parentId);
};

