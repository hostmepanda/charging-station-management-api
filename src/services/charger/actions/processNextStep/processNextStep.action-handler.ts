import { ActionSchema, Context } from 'moleculer';

import { processNextStepParamsSchema } from './processNextStep.params-schema';
import { GetTaskByIdResponseInterface } from '../../types/getTaskByIdResponse.interface';
import { ChargeCommandEnum } from '../../constants/chargeCommand.enum';
import { StepCommand } from '../../types';
import { ChargeEvent } from '../../constants';

type Station = {
  companyId: number;
  id: number | string;
  name: string;
  maxPower: number;
};

const waitForSeconds = (delay: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });

export const processNextStep: ActionSchema = {
  params: processNextStepParamsSchema,
  async handler(ctx: Context<{ taskId: number; }>) {
    const { taskId } = ctx.params;
    const timeStamp = new Date();

    const { activeStepIndex, nextStepIndex, steps }: GetTaskByIdResponseInterface = await this.getTaskById(taskId);
    const activeStep = steps[activeStepIndex];
    const { index: currentStepIndex, param, step } = activeStep;

    if (step === ChargeCommandEnum.Wait) {
      const updatedSteps: StepCommand[] = [...steps];
      updatedSteps[activeStepIndex] = {
        ...activeStep,
        timestamp: timeStamp.valueOf(),
      };
      const nextStepIndex = currentStepIndex + 1;
      const updateTaskParams = {
        activeStepIndex: nextStepIndex,
        nextStepIndex: currentStepIndex + 2 > steps.length ? null : currentStepIndex + 2,
        steps: updatedSteps,
        taskId,
      };

      await waitForSeconds(param as number * 1000);
      await this.updateTask(updateTaskParams);
    }

    if (step === ChargeCommandEnum.StartStation) {
      const updatedSteps: StepCommand[] = [...steps];

      const stations: Station[] = await ctx.broker.call(
        'v1.stations.listRecordsByStationId',
        { id: param },
      );
      const companiesId = stations.map(({ companyId }) => companyId);
      const parentCompanyIds = await ctx.broker.call('v1.companies.listParents', { ids: companiesId });

      const companyStationChargeData = stations.reduce(
        (transformed: any, { id, maxPower }) => {
          if (!transformed?.id) {
            transformed[id] = {
              id,
              chargingStations: [],
              chargingPower: 0,
            };
          }
          transformed[id].chargingStations.push(id);
          transformed[id].chargingPower += maxPower;
          return transformed;
        },
        {},
      );

      updatedSteps[activeStepIndex] = {
        ...activeStep,
        timestamp: timeStamp.valueOf(),
        companies: [
          ...Object.values(companyStationChargeData),
        ] as StepCommand['companies'],
      };

      const nextStepIndex = currentStepIndex + 1;
      const updateTaskParams = {
        activeStepIndex: nextStepIndex > steps.length - 1 ? null : nextStepIndex,
        nextStepIndex: currentStepIndex + 2 > steps.length - 1 ? null : currentStepIndex + 2,
        steps: updatedSteps,
        taskId,
      };
      await this.updateTask(updateTaskParams);
    }

    if (step === ChargeCommandEnum.StopStation) {
      const updatedSteps: StepCommand[] = [...steps];

      const nextStepIndex = currentStepIndex + 1;
      const updateTaskParams = {
        activeStepIndex: nextStepIndex > steps.length - 1 ? null : nextStepIndex,
        nextStepIndex: currentStepIndex + 2 > steps.length -1 ? null : currentStepIndex + 2,
        steps: updatedSteps,
        taskId,
      };
      await this.updateTask(updateTaskParams);
    }

    if (activeStepIndex !== null) {
      await ctx.emit(ChargeEvent.ProcessNextStep, { taskId });
    }

    if (nextStepIndex !== null) {

    }
  },
};
