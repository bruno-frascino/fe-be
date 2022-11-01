import { pino } from 'pino';
import config from 'config';
import { ConfigKeys } from '../model/utils.model';

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true }
})

const logger = pino({ level: config.get(ConfigKeys.LOG_LEVEL) }, transport)

export default logger;