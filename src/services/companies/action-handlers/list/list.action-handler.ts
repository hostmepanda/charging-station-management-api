import { ActionSchema } from 'moleculer';

export const list: ActionSchema = {
  async handler() {
    return this.listAllCompanies();
  },
};
