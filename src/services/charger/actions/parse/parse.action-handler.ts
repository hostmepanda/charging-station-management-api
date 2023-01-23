import Moleculer, { ActionSchema, Context } from 'moleculer';
import ValidationError = Moleculer.Errors.ValidationError;

type ParseParams = { body: string; inputCommandsList: string[]; };
type CommandValidationError = { errorMessage: string; commandLine: string; commandLineNumber: number; };

const START_STATION_COMMAND = 'Start station';
const STOP_STATION_COMMAND = 'Stop station';
const WAIT_STATION_COMMAND = 'Wait';
const BEGIN_COMMAND = 'Begin';
const END_COMMAND = 'End';
const COMMAND_SEPARATOR = ' ';

export const parse: ActionSchema = {
  hooks: {
    before: (ctx: Context<ParseParams>) => {
      const { body: rawInputCommands } = ctx.params;

      let isContainIllegalCommands: CommandValidationError[] = [];
      let isContainIllegalCommandValue: CommandValidationError[] = [];
      let isAllowedInputValue: boolean = false;

      const inputCommandsList = rawInputCommands.split('\n');

      const isStartWithBegin = inputCommandsList.at(0) === BEGIN_COMMAND;
      const isEndWithEnd = inputCommandsList.at(-1) === END_COMMAND;
      const isCorrectStartEnd = isStartWithBegin && isEndWithEnd;

      if (!isCorrectStartEnd) {
        ctx.broker.logger.error(
          `Script parsing failed due to wrong front ${BEGIN_COMMAND} / ${END_COMMAND} commands`,
          { isStartWithBegin, isEndWithEnd, isCorrectStartEnd },
        );
        throw new ValidationError(
          'Error happened while parsing script. Script must ' +
          `${!isStartWithBegin ? 'start with ' + BEGIN_COMMAND : ''}` +
          `${!isEndWithEnd ? 'end with ' + END_COMMAND : ''}`.trim(),
        );
      }

      inputCommandsList.slice(1, inputCommandsList.length - 1).forEach(
        (commandLine, index) => {
          let inputValue: string | undefined = undefined;

          const isStartStation = commandLine.startsWith(`${START_STATION_COMMAND}${COMMAND_SEPARATOR}`);
          const isStopStation = commandLine.startsWith(`${STOP_STATION_COMMAND}${COMMAND_SEPARATOR}`);
          const isWait = commandLine.startsWith(`${WAIT_STATION_COMMAND}${COMMAND_SEPARATOR}`);

          const isAllowedCommand = isStartStation || isStopStation || isWait;

          if (!isAllowedCommand) {
            isContainIllegalCommands.push({
              errorMessage: 'Command is not allowed',
              commandLine,
              commandLineNumber: index + 2,
            });

            return undefined;
          }

          if (isStartStation) {
            ([, inputValue] = commandLine.split(`${START_STATION_COMMAND}${COMMAND_SEPARATOR}`));
            isAllowedInputValue = inputValue === 'all' || (!isNaN(Number(inputValue)) && Number(inputValue) >= 0);
          }

          if (isStopStation) {
            ([, inputValue] = commandLine.split(`${STOP_STATION_COMMAND}${COMMAND_SEPARATOR}`));
            isAllowedInputValue = inputValue === 'all' || (!isNaN(Number(inputValue)) && Number(inputValue) >= 0);
          }

          if (isWait) {
            ([, inputValue] = commandLine.split(`${WAIT_STATION_COMMAND}${COMMAND_SEPARATOR}`));
            isAllowedInputValue = !isNaN(Number(inputValue)) && Number(inputValue) >= 0;
          }

          if (!isAllowedInputValue) {
            isContainIllegalCommandValue.push({
              errorMessage: 'Command value is not allowed. It should be all or valid positive number',
              commandLine,
              commandLineNumber: index + 2,
            });

            return undefined;
          }
        },
      );

      if (isContainIllegalCommands.length > 0) {
        throw new ValidationError(
          `Error happened while parsing script. Command in not allowed. Command line number ${isContainIllegalCommands[0]!.commandLineNumber}`
        );
      }

      if (isContainIllegalCommandValue.length > 0) {
        throw new ValidationError(
          `Error happened while parsing script. Command value in not allowed for the command line number ${isContainIllegalCommandValue[0]!.commandLineNumber}`
        );
      }

      ctx.params = {
        ...ctx.params,
        inputCommandsList,
      };
    },
    after: (ctx: Context<unknown, { $statusCode: unknown; $location: unknown }>) => {
      ctx.meta.$statusCode = 201;
      ctx.meta.$location = 'GET /api/charger/current-status';
    },
  },
  async handler(ctx: Context<ParseParams>) {
    const { inputCommandsList } = ctx.params;
    ctx.broker.logger.info(inputCommandsList);
  },
};
