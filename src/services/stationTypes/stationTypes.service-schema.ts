import { ServiceSchema } from 'moleculer';

import * as actionHandlers from './action-handlers';
import { StationTypesDbStoreMixin } from './store/stationTypes.dbStore.mixin';

export const StationTypesServiceSchema: ServiceSchema = {
  name: 'stationTypes',
  mixins: [StationTypesDbStoreMixin],
  version: process.env.STATIONTYPES_SERVICE_VERSION ?? 1,
  settings: {
    port: process.env.STATIONTYPES_SERVICE_PORT ?? 3004,
  },
  actions: actionHandlers,
};

export default StationTypesServiceSchema;
