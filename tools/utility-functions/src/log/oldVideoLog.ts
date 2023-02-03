// this is mostly just an example for colored logging with loglevels.

import { log } from './logWithLevels';

const colors = {
  debug: 'blue',
  info: 'green',
  warn: 'orange',
  error: 'red',
};

const logger = (level, msg) => (msg ? log[level]('%c%s', `color: ${colors[level]}`, `📹 ${msg}`) : null);

// TODO add param handling without logging undefined
export const videoLog = {
  debug: (msg) => logger('debug', msg),
  log: (msg) => logger('info', msg),
  info: (msg) => logger('info', msg),
  warn: (msg) => logger('warn', msg),
  error: (msg) => logger('error', msg),
};
