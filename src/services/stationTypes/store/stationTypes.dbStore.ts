import { DbStore } from '../../../storages/dbStore';

interface InsertRecordParams {
  name: string;
}

interface DeleteRecordParams {
  id: number;
}

interface UpdateRecordParams {
  id: number;
  name: string;
}

interface GetRecordParams {
  id: number;
}

export class StationTypesDbStore extends DbStore {
  async createTable() {
    return this.store!.run(
      `CREATE TABLE  IF NOT EXISTS stationTypes (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            name STRING
           )`,
    );
  }

  async deleteRecord(deleteParams: DeleteRecordParams) {
    const { id } = deleteParams;

    return this.store!.run(
      `DELETE FROM stationTypess WHERE id=(?)`,
      id
    )
  }

  async getRecord(getParams: GetRecordParams) {
    const { id } = getParams;

    return await this.store!.get(
      `SELECT id, name FROM stationTypes WHERE id=(?)`,
      id,
    );
  }

  async insertRecord(insertParams: InsertRecordParams) {
    const { name } = insertParams;
    return this.store!.run(
      'INSERT INTO stationTypes (name) VALUES (?)',
      name
    );
  }

  async listRecord() {
    return await this.store!.all(
      'SELECT id, name FROM stationTypes ORDER by name ASC',
    );
  }

  async updateRecord(updateParams: UpdateRecordParams) {
    const { id, name } = updateParams;
    return this.store!.run(
      `UPDATE stationTypes SET name=(?) WHERE id=(?)`,
      id,
      name,
    );
  }
}
