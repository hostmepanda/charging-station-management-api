import { DbStore } from '../../../storages/dbStore';

interface InsertRecordParams {
  name: string;
  companyId: number;
  stationTypeId: number;
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

export class StationsDbStore extends DbStore {
  async createTable() {
    return this.store!.run(
      `CREATE TABLE IF NOT EXISTS stations (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            name STRING NOT NULL,
            company_id INTEGER NOT NULL,
            station_type_id INTEGER NOT NULL
           )`,
    );
  }

  async deleteRecord(deleteParams: DeleteRecordParams) {
    const { id } = deleteParams;

    return this.store!.run(
      `DELETE FROM stations WHERE id=(?)`,
      id
    )
  }

  async getRecord(getParams: GetRecordParams) {
    const { id } = getParams;

    return await this.store!.get(
      `SELECT id, name, companies.name, stationTypes.name, stationTypes.max_power FROM stations
            INNER JOIN companies 
            ON stationTypes.company_id =  companies.id
            INNER JOIN stationTypes
            ON stationTypes.station_type_id = stationTypes.id
            WHERE id=(?)`,
      id,
    );
  }

  async insertRecord(insertParams: InsertRecordParams) {
    const { name, stationTypeId, companyId } = insertParams;
    return this.store!.run(
      'INSERT INTO stations (name, company_id, station_type_id) VALUES (?, ?, ?)',
      name,
      companyId,
      stationTypeId
    );
  }

  async listRecord() {
    return await this.store!.all(
      'SELECT id, name FROM stations ORDER by id ASC',
    );
  }

  async updateRecord(updateParams: UpdateRecordParams) {
    const { id, name } = updateParams;
    return this.store!.run(
      `UPDATE stations SET name=(?) WHERE id=(?)`,
      name,
      id,
    );
  }
}
