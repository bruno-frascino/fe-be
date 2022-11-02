import sqlite3 from 'sqlite3';
import logger from '../logger';
import config from 'config';
import { ConfigKeys } from '../model/utils.model';

let db: sqlite3.Database;

export function connect(callback?: Function) {
  const dbName: string = config.get(ConfigKeys.DB_NAME);
  const verbose: boolean = config.get(ConfigKeys.DB_VERBOSE);

  const sqlite = verbose ? sqlite3.verbose() : sqlite3;

  // TODO - database path when in dist folder
  db = new sqlite.Database(`./${dbName}`, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info(`Connected to ${dbName} database.`);
      callback && callback();
    }
  });
}

