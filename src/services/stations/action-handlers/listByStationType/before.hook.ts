import { Context } from 'moleculer';

import { checkId } from '../../../../globalHelpers';

export const beforeActionHandler = (ctx: Context<{ id: number | string; }>) => {
  const { id } = ctx.params;

  checkId(id);
};
