import { ActionSchema } from 'moleculer';

export const ListActionHandler: ActionSchema = {
  rest: 'GET /',
  async handler() {
    return this.listAllStations();
  },
};
