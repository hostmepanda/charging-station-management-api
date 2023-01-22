import { DbStore } from '../../../storages/dbStore';

interface InsertRecordParams {
  name: string;
  parentId?: number;
}

interface DeleteRecordParams {
  id: number;
}

interface UpdateRecordParams {
  id: number;
  name: string;
  parentId?: number;
}

interface GetRecordParams {
  id: number;
}

export class CompaniesDbStore extends DbStore {
  async createTable() {
    return this.store!.run(
      `CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            name STRING NOT NULL,
            parent_company_id INTEGER DEFAULT NULL
           )`,
    );
  }

  async deleteRecord(deleteParams: DeleteRecordParams) {
    const { id } = deleteParams;

    return this.store!.run(
      `DELETE FROM companies WHERE id=(?)`,
      id
    )
  }

  async getRecord(getParams: GetRecordParams) {
    const { id } = getParams;

    return await this.store!.get(
      `SELECT id, name, parent_company_id FROM companies WHERE id=(?)`,
      id,
    );
  }

  async insertRecord(insertParams: InsertRecordParams) {
    const { name, parentId } = insertParams;
    return this.store!.run(
      'INSERT INTO companies (name, parent_company_id) VALUES (?, ?)',
      name,
      parentId
    );
  }

  async listRecord() {
    return await this.store!.all(
      `SELECT company.id, company.name, company.parent_company_id
            FROM companies company
            LEFT JOIN companies parent
            ON company.parent_company_id = parent.id 
            ORDER by company.id ASC`,
    );
  }

  async updateRecord(updateParams: UpdateRecordParams) {
    const { id, name, parentId } = updateParams;

    if (parentId) {
      return this.store!.run(
        `UPDATE companies SET name=(?), parent_company_id=(?) WHERE id=(?) `,
        name,
        parentId,
        id
      );
    } else {
      return this.store!.run(
        `UPDATE companies SET name=(?) WHERE id=(?) `,
        name,
        id
      );
    }

  }
}
