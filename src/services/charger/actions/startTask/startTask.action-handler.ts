import { ActionSchema, Context } from 'moleculer';

import { startTaskParamsSchema } from './startTask.params-schema';
import { ChargeEvents } from '../../constants';

export const startTask: ActionSchema = {
  params: startTaskParamsSchema,
  async handler(ctx: Context<{ taskId: number; }>) {
    const { taskId } = ctx.params;

    const { steps } = await this.getTaskById(taskId);

    const [beginStep, ...restSteps] = steps;
    const updatedSteps = [
      {
        ...beginStep,
        timestamp: new Date(),
        companies: [],
        totalChargingStations: [],
        totalChargingPower: 0
      },
      ...restSteps,
    ];

    const updateTaskParams = {
      activeStepIndex: beginStep.index + 1,
      nextStepIndex: beginStep.index + 2,
      steps: updatedSteps,
      taskId,
    };
    await this.updateTask(updateTaskParams);
    await ctx.emit(ChargeEvents.ProcessNextTask, { taskId });
  },
};
