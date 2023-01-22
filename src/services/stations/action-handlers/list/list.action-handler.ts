import { ActionSchema } from 'moleculer';

export const list: ActionSchema = {
  rest: 'GET /',
  async handler() {
    return this.listAllStations();
  },
};
