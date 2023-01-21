import sqliteDriver from 'sqlite3';
import { Database, open } from 'sqlite';

interface LoggerInterface {
  error: (message: string, details?: unknown) => void;
  info: (message: string, details?: unknown) => void;
}

interface DbStoreConstructorParams {
  logger?: LoggerInterface;
  databasePath?: string;
  serviceName?: string | undefined;
}

export class DbStore {
  databasePath: string
  logger: LoggerInterface
  store: Database | null
  serviceName: string | undefined

  constructor({ logger = console, databasePath = ':memory:', serviceName }: DbStoreConstructorParams = {}) {
    this.databasePath = databasePath;
    this.logger = logger;
    this.store = null;
    this.serviceName = serviceName;
  }

  async connect() {
    try {
      this.store = await open({
        filename: this.databasePath,
        driver: sqliteDriver.Database,
      });
      this.logger.info(
        `Connected to ${this.serviceName ?? ''} DB successfully`.trim(),
      );
    } catch (error: any) {
      this.logger.error(
        'Error happened during connecting to database',
        { error, serviceName: this.serviceName },
      );
      throw new Error(error.message);
    }
  }
}