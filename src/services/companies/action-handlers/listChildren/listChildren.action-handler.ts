import { ActionSchema, Context } from 'moleculer';

import { listChildrenParamsSchema } from './listChildren.params-schema';
import { beforeActionHandler } from './before.hook';

export const listChildren:ActionSchema = {
  params: listChildrenParamsSchema,
  hooks: {
    before: beforeActionHandler,
  },
  async handler(ctx: Context<{ id: string | number}>) {
    const { id } = ctx.params;
    return this.listChildren(id);
  },
};
