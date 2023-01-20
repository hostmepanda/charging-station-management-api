import { DbStore } from '../../../storages/dbStore';

interface InsertRecordParams {
  name: string;
  maxPower: number;
}

interface DeleteRecordParams {
  id: number;
}

interface UpdateRecordParams {
  id: number;
  name: string;
  maxPower: number;
}

interface GetRecordParams {
  id: number;
}

export class StationTypesDbStore extends DbStore {
  async createTable() {
    return this.store!.run(
      `CREATE TABLE IF NOT EXISTS stationTypes (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            name STRING NOT NULL,
            max_power INTEGER
           )`,
    );
  }

  async deleteRecord(deleteParams: DeleteRecordParams) {
    const { id } = deleteParams;

    return this.store!.run(
      `DELETE FROM stationTypes WHERE id=(?)`,
      id
    )
  }

  async getRecord(getParams: GetRecordParams) {
    const { id } = getParams;

    return await this.store!.get(
      `SELECT id, name, max_power FROM stationTypes WHERE id=(?)`,
      id,
    );
  }

  async insertRecord(insertParams: InsertRecordParams) {
    const { name, maxPower } = insertParams;
    return this.store!.run(
      'INSERT INTO stationTypes (name, max_power) VALUES (?, ?)',
      name,
      maxPower,
    );
  }

  async listRecord() {
    return await this.store!.all(
      'SELECT id, name, max_power FROM stationTypes ORDER by id ASC',
    );
  }

  async updateRecord(updateParams: UpdateRecordParams) {
    const { id, name, maxPower } = updateParams;

    if (name && maxPower) {
      return this.store!.run(
        `UPDATE stationTypes SET name=(?), max_power=(?) WHERE id=(?)`,
        name,
        maxPower,
        id,
      );
    }
    if (name) {
      return this.store!.run(
        `UPDATE stationTypes SET name=(?) WHERE id=(?)`,
        name,
        id,
      );
    }

    if (maxPower) {
      return this.store!.run(
        `UPDATE stationTypes SET max_power=(?) WHERE id=(?)`,
        maxPower,
        id,
      );
    }
  }
}
