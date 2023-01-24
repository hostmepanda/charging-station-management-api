import { ServiceSchema } from 'moleculer';

import { CompaniesDbStore } from './companies.dbStore';
import { UpdateHandlerParamsType } from '../action-handlers/update/update.handler-params.type';

const companiesDbPath = process.env.COMPANIES_DB_PATH ?? process.env.SERVICES_DB_PATH ?? ':memory:';

export const CompaniesDbStoreMixin:ServiceSchema = {
  name: 'companies-db-store',
  methods: {
    async createCompany(createParams: { name: string, parentId?: number }) {
      return this.store.insertRecord(createParams);
    },
    async deleteCompany(deleteParams: { id: number; }) {
      return this.store.deleteRecord(deleteParams);
    },
    async getCompany(getParams: { id: number }) {
      return this.store.getRecord(getParams);
    },
    async listAllCompanies() {
      return this.store.listRecord();
    },
    async listChildren(parentId) {
      return this.store.listRecordByParentCompanyId(parentId);
    },
    async listChildrenWithStations(companyId: number) {
      return this.store.listRecordsWithPopulate(companyId);
    },
    async listParentByChildIds(ids: (string | number)[]) {
      return this.store.listRecordsByChildIds(ids);
    },
    async updateCompany(updateParams: UpdateHandlerParamsType) {
      return this.store.updateRecord(updateParams);
    },
  },
  async created() {
    const dbStore = new CompaniesDbStore({
      databasePath: companiesDbPath,
      logger: this.broker.logger,
      serviceName: this.name,
    });
    await dbStore.connect();
    this.store = dbStore;
    await dbStore.createTable();
  },
};
