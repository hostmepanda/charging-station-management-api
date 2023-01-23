import { DbStore } from '../../../storages/dbStore';
import { StepParams, StepCommand, TaskId } from '../types';

export class ChargerDbStore extends DbStore {
  async createTable() {
    return this.store!.run(
      `CREATE TABLE IF NOT EXISTS chargeScriptParse (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            active_step_index INTEGER NOT NULL,
            next_step_index INTEGER NOT NULL,
            steps STRING NOT NULL,
            raw_script STRING NOT NULL,
            requested_at INTEGER NOT NULL DEFAULT current_timestamp
           )`,
    );
  }

  async getRecordById(taskId: string | number) {
    return this.store!.get(
      `SELECT steps, requested_at as requestedAt, active_step_index as activeStepIndex, 
            next_step_index as nextStepIndex
            FROM chargeScriptParse 
            WHERE id=(?)`,
      taskId,
    );
  }

  async insertRecord(insertParams: StepParams) {
    const { activeStepIndex, nextStepIndex, steps, rawScript, } = insertParams;
    return this.store!.run(
      'INSERT INTO chargeScriptParse (active_step_index, next_step_index, raw_script, steps) VALUES (?, ?, ?, ?)',
      activeStepIndex,
      nextStepIndex,
      rawScript,
      JSON.stringify(steps),
    );
  }

  async updateRecord(updateParams: { steps: StepCommand[], taskId: TaskId }) {
    const { steps, taskId } = updateParams;
    return this.store!.run(
      `UPDATE chargeScriptParse SET steps=(?) WHERE id=(?)`,
      JSON.stringify(steps),
      taskId,
    );
  }

}
