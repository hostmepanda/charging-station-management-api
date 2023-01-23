import { ServiceSchema } from 'moleculer';

import * as actionHandlers from './actions';
export const ChargerServiceSchema: ServiceSchema = {
  name: 'charger',
  version: process.env.CHARGER_SERVICE_VERSION ?? 1,
  settings: {
    port: process.env.CHARGER_SERVICE_PORT ?? 3005,
  },
  actions: actionHandlers,
};

export default ChargerServiceSchema;
