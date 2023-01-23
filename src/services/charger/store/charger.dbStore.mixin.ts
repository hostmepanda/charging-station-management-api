import { ServiceSchema } from 'moleculer';

import { StepParams, TaskId } from '../types';
import { ChargerDbStore } from './charger.dbStore';

const stationsDbPath = process.env.CHARGER_DB_PATH ?? process.env.SERVICES_DB_PATH ?? ':memory:';

export const ChargerDbStoreMixin:ServiceSchema = {
  name: 'charger-db-store',
  methods: {
    async addStepsFromScript(createParams: StepParams) {
      return this.store.insertRecord(createParams);
    },
    async getTaskById(taskId: TaskId) {
      const chargeTask = await this.store.getRecordById(taskId);

      return {
        ...chargeTask,
        steps: JSON.parse(chargeTask.steps),
      };
    },
    async updateTask(updateParams: StepParams) {
      return this.store.updateRecord(updateParams);
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
