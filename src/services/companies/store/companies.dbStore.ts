import { DbStore } from '../../../storages/dbStore';

interface InsertRecordParams {
  name: string;
}

export class CompaniesDbStore extends DbStore {
  async createTable() {
    return this.store!.run(
      `CREATE TABLE  IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            name STRING
           )`,
    );
  }

  async insertRecord(insertParams: InsertRecordParams) {
    const { name } = insertParams;
    return this.store!.run(
      'INSERT INTO companies (name) VALUES (?)',
      name
    );
  }
}
