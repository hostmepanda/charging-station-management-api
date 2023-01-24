import { StepCommand } from './stepCommand.type';

export type StepParams = {
  activeStepIndex?: number | string;
  nextStepIndex?: number | string;
  steps: StepCommand[];
  rawScript?: string;
};