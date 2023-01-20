import sqliteDriver from 'sqlite3';
import { Database, open } from 'sqlite';

interface LoggerInterface {
  error: (message: string, details?: unknown) => void;
  info: (message: string, details?: unknown) => void;
}

interface DbStoreConstructorParams {
  logger?: LoggerInterface;
  databasePath?: string;
}

export class DbStore {
  databasePath: string
  logger: LoggerInterface
  store: Database | null

  constructor({ logger = console, databasePath = ':memory:' }: DbStoreConstructorParams = {}) {
    this.databasePath = databasePath;
    this.logger = logger;
    this.store = null;
  }

  async connect() {
    try {
      this.store = await open({
        filename: this.databasePath,
        driver: sqliteDriver.Database,
      });
      this.logger.info(
        'Connected to DB successfully',
      );
    } catch (error: any) {
      this.logger.error(
        'Error happened during connecting to database',
        { error },
      );
      throw new Error(error.message);
    }
  }
}