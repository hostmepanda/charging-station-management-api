export type StepCommand = {
  companies?: (string | number)[];
  index: number;
  param: string | number | null;
  step: string;
  timestamp?: number;
  totalChargingPower?:number;
  totalChargingStations?: (string | number)[];
};
