import Moleculer, { Context } from 'moleculer';

import ValidationError = Moleculer.Errors.ValidationError;

export const checkMaxPower = (maxPower: string | number) => {
  const maxPowerNotNumber = isNaN(Number(maxPower));

  if (maxPowerNotNumber) {
    throw new ValidationError('maxPower should be a valid number');
  }

  if (maxPower <= 0) {
    throw new ValidationError('maxPower should be a greater 0');
  }
};

export const throwIfStationTypeBelongsToStation = async (ctx: Context, stationTypeId: string | number) => {
  try {
    const stations: {
      id: number;
      name: string;
      company_id: number;
      station_type_id: number;
    }[] = await ctx.broker.call('v1.stations.listByStationType', { id: Number(stationTypeId) });

    if (stations.length > 0) {
      ctx.broker.logger.error(
        'Can not process the operation, station type is attached to one or several stations',
        { stationTypeId, stationsCount: stations.length },
      );
      throw new ValidationError(
        'Can not process the operation, station type is attached to one or several stations'
      );
    }
  } catch (error: unknown) {
    const caughtError = error as { type: string; message: string };

    if (caughtError?.type === 'VALIDATION_ERROR') {
      throw error;
    } else {
      throw new Moleculer.Errors.MoleculerError(
        `Error happened during processing the request`,
      );
    }
  }
};
