import sqlite3 from 'sqlite3';
import logger from '../logger';
import config from 'config';
import { ConfigKeys } from '../model/utils.model';
import { Resource } from '../model/resource.model';

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

export function getInstance() {
  if (!db) {
    connect(getInstance);
  }
  return db;
}

function getRow(sql: string, params: any[] = []) {
  logger.debug(`Running get sql: ${sql} with params: ${params}`);
  return new Promise((resolve, reject) => {
    getInstance().get(sql, params, (err, result) => {
      if (err) {
        logger.error(`Error running get sql: ${sql} with error ${err}`);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function run(sql: string, params: {} = {}) {
  logger.debug(`Running sql: ${sql} with params: ${JSON.stringify(params)}`);
  return new Promise((resolve, reject) => {
    getInstance().run(sql, params, function (err) {
      if (err) {
        logger.error(`Error running sql: ${sql} with error ${err}`);
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
}

export function all(sql: string, params: {} = {}) {
  logger.debug(`Running sql: ${sql} with params: ${JSON.stringify(params)}`);
  return new Promise((resolve, reject) => {
    getInstance().all(sql, params, (err, rows) => {
      if (err) {
        logger.error(`Error running sql: ${sql} with error ${err}`);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function getRootLevelResources() {
  const sql = `SELECT * FROM RESOURCE 
                WHERE RESOURCE.parentId IS NULL 
                ORDER BY RESOURCE.name`;
  
  return (await all(sql)) as Resource[];
}
