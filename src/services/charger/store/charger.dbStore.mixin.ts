import { ServiceSchema } from 'moleculer';

import { StepCommand } from '../types';
import { ChargerDbStore } from './charger.dbStore';

const stationsDbPath = process.env.CHARGER_DB_PATH ?? process.env.SERVICES_DB_PATH ?? ':memory:';

export const ChargerDbStoreMixin:ServiceSchema = {
  name: 'charger-db-store',
  methods: {
    async addStepsFromScript(createParams: { steps: StepCommand[], rawScript: string; }) {
      return this.store.insertRecord(createParams);
    },
  },
  async created() {
    const dbStore = new ChargerDbStore({
      databasePath: stationsDbPath,
      logger: this.broker.logger,
      serviceName: this.name,
    });
    await dbStore.connect();
    this.store = dbStore;
    await dbStore.createTable();
  },
};
