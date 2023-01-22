import { Context } from 'moleculer';

import { checkId } from '../../../../globalHelpers';

export const beforeActionHandler = (ctx: Context<{ id: string | number; }>) => {
  const { id } = ctx.params;

  checkId(id);
};
