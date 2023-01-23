import { Context, ServiceSchema } from 'moleculer';

import * as actionHandlers from './actions';
import { ChargerDbStoreMixin } from './store/charger.dbStore.mixin';
import { ChargeEvents } from './constants';

export const ChargerServiceSchema: ServiceSchema = {
  name: 'charger',
  version: process.env.CHARGER_SERVICE_VERSION ?? 1,
  mixins: [ChargerDbStoreMixin],
  settings: {
    port: process.env.CHARGER_SERVICE_PORT ?? 3005,
  },
  events: {
    async [ChargeEvents.NewTaskCreated](ctx: Context<{ taskId: number; }>) {
      const { taskId } = ctx.params;
      await ctx.broker.call('v1.charger.startTask', { taskId });
    },
  },
  actions: actionHandlers,
};

export default ChargerServiceSchema;
