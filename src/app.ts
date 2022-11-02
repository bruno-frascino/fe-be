import express from 'express';
import config from 'config';
import logger from './logger';
import { ConfigKeys } from './model/utils.model';
import routes from './routes';
import * as sqlite from './repository/sqlite';

// export NODE_ENV=development (default)
const port: number = config.get(ConfigKeys.port);
const host: string = config.get(ConfigKeys.host);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to the database and initialise routes
sqlite.connect(async () => {
  app.listen(port, host, () => {
    logger.info(`⚡️[server]: Server is running at http://${host}:${port}`);
    routes(app);
  });
});