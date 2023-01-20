import { ServiceSchema } from 'moleculer';

import * as actionHandlers from './action-handlers';
import { StationsDbStoreMixin } from './store/stations.dbStore.mixin';

export const StationsServiceSchema: ServiceSchema = {
  name: 'stations',
  mixins: [StationsDbStoreMixin],
  version: process.env.STATIONS_SERVICE_VERSION ?? 1,
  settings: {
    port: process.env.STATIONS_SERVICE_PORT ?? 3003,
  },
  actions: actionHandlers,
};

export default StationsServiceSchema;
