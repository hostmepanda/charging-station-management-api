import { ServiceSchema } from 'moleculer';
import { DbStore } from './dbStore';

export const DbStoreMixin:ServiceSchema = {
  name: 'db-store',
  methods: {
    async create(createParams: { id: number; name: string }) {
      return this.store.insertRecord(createParams);
    },
  },
  async created() {
    const dbStore = new DbStore({ logger: this.broker.logger });
    await dbStore.connect();
    this.store = dbStore;
  },
};

export default DbStoreMixin;
