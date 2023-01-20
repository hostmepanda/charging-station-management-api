import { ServiceSchema } from 'moleculer';
import { CompaniesDbStore } from './companies.dbStore';

export const CompaniesDbStoreMixin:ServiceSchema = {
  name: 'companies-db-store',
  methods: {
    async create(createParams: { name: string }) {
      return this.store.insertRecord(createParams);
    },
  },
  async created() {
    const dbStore = new CompaniesDbStore({ logger: this.broker.logger });
    await dbStore.connect();
    this.store = dbStore;
    await dbStore.createTable();
  },
};
