import { DbStore } from '../../../storages/dbStore';

interface InsertRecordParams {
  name: string;
}

interface DeleteRecordParams {
  id: number;
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

  async listRecord() {
    return await this.store!.all(
      'SELECT id, name FROM companies ORDER by name ASC',
    );
  }

  async deleteRecord(deleteParams: DeleteRecordParams) {
    const { id } = deleteParams;

    return this.store!.run(
      `DELETE FROM companies WHERE id=(?)`,
      id
    )
  }
}
