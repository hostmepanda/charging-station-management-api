export type StepCommand = {
  companies?: {
    id: string | number;
    chargingStations: (string | number)[];
    chargingPower: number;
  }[];
  index: number;
  param: string | number | null;
  step: string;
  timestamp?: number;
  totalChargingPower?:number;
  totalChargingStations?: (string | number)[];
};
