import { StepCommand } from './stepCommand.type';

export interface GetTaskByIdResponseInterface {
  steps: StepCommand[];
  requestedAt: number;
  activeStepIndex: number;
  nextStepIndex: number;
}
