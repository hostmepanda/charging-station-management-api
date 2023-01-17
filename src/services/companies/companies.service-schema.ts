import { ServiceSchema } from 'moleculer';

import * as actionHandlers from './action-handlers';

export const CompaniesServiceSchema: ServiceSchema = {
  name: 'companies',
  version: process.env.COMPANIES_SERVICE_VERSION ?? 1,
  settings: {
    port: process.env.COMPANIES_SERVICE_PORT ?? 3002,
  },
  actions: actionHandlers,
};

export default CompaniesServiceSchema;
