import { ServiceSchema } from 'moleculer';
import { CompaniesDbStore } from './companies.dbStore';

const companiesDbPath = process.env.COMPANIES_DB_PATH ?? ':memory:';

export const CompaniesDbStoreMixin:ServiceSchema = {
  name: 'companies-db-store',
  methods: {
    async createCompany(createParams: { name: string }) {
      return this.store.insertRecord(createParams);
    },
    async listAllCompanies() {
      return this.store.listRecord();
    },
    async deleteCompany(deleteParams: { id: number; }) {
      return this.store.deleteRecord(deleteParams);
    },
  },
  async created() {
    const dbStore = new CompaniesDbStore({
      databasePath: companiesDbPath,
      logger: this.broker.logger,
    });
    await dbStore.connect();
    this.store = dbStore;
    await dbStore.createTable();
  },
};
