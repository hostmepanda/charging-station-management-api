import { ServiceSchema } from 'moleculer';

import { StationsDbStore } from './stations.dbStore';
import { UpdateHandlerParamsType } from '../action-handlers/update/update.handler-params.type';

const stationsDbPath = process.env.STATIONS_DB_PATH ?? process.env.SERVICES_DB_PATH ?? ':memory:';

export const StationsDbStoreMixin:ServiceSchema = {
  name: 'stations-db-store',
  methods: {
    async createStation(createParams: { name: string }) {
      return this.store.insertRecord(createParams);
    },
    async deleteStation(deleteParams: { id: number; }) {
      return this.store.deleteRecord(deleteParams);
    },
    async getStation(getParams: { id: number }) {
      return this.store.getRecord(getParams);
    },
    async listAllStations() {
      return this.store.listRecord();
    },
    async updateStation(updateParams: UpdateHandlerParamsType) {
      return this.store.updateRecord(updateParams);
    },
  },
  async created() {
    const dbStore = new StationsDbStore({
      databasePath: stationsDbPath,
      logger: this.broker.logger,
      serviceName: this.name,
    });
    await dbStore.connect();
    this.store = dbStore;
    await dbStore.createTable();
  },
};
