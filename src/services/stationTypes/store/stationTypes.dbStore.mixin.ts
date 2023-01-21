import { ServiceSchema } from 'moleculer';

import { StationTypesDbStore } from './stationTypes.dbStore';
import { UpdateHandlerParamsType } from '../action-handlers/update/update.handler-params.type';

const stationTypesDbPath = process.env.STATIONTYPES_DB_PATH ?? process.env.SERVICES_DB_PATH ?? ':memory:';

export const StationTypesDbStoreMixin:ServiceSchema = {
  name: 'stationTypes-db-store',
  methods: {
    async createStationType(createParams: { name: string }) {
      return this.store.insertRecord(createParams);
    },
    async deleteStationType(deleteParams: { id: number; }) {
      return this.store.deleteRecord(deleteParams);
    },
    async getStationType(getParams: { id: number }) {
      return this.store.getRecord(getParams);
    },
    async listAllStationTypes() {
      return this.store.listRecord();
    },
    async updateStationType(updateParams: UpdateHandlerParamsType) {
      return this.store.updateRecord(updateParams);
    },
  },
  async created() {
    const dbStore = new StationTypesDbStore({
      databasePath: stationTypesDbPath,
      logger: this.broker.logger,
      serviceName: this.name,
    });
    await dbStore.connect();
    this.store = dbStore;
    await dbStore.createTable();
  },
};
