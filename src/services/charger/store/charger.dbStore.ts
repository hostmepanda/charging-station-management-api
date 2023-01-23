import { DbStore } from '../../../storages/dbStore';
import { StepCommand } from '../types';

interface InsertRecordParams {
  rawScript: string;
}

export class ChargerDbStore extends DbStore {
  async createTable() {
    return this.store!.run(
      `CREATE TABLE IF NOT EXISTS chargeScriptParse (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            raw_script STRING NOT NULL,
            requested_at INTEGER NOT NULL DEFAULT NOW,
            steps STRING NOT NULL
           )`,
    );
  }

  async insertRecord(insertParams: { steps: StepCommand[], rawScript: string; }) {
    const { steps, rawScript } = insertParams;
    return this.store!.run(
      'INSERT INTO chargeScriptParse (raw_script, steps) VALUES (?, ?)',
      rawScript,
      steps,
    );
  }

}
