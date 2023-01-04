import chalk from 'chalk';
import { config } from './config.mjs';

const getTime = () => `[${new Date().toISOString().slice(0, 19).replace('T', ' ')}]`;
const { logLevel } = config.app;

// 0 = logs info, warn, error
// 1 = logs warn, error
// 2 = logs error
// 3 = logs nothing

const info = (...args) => {
  if (logLevel <= 0) console.info(chalk.green(getTime()), ...args);
};

const warn = (...args) => {
  if (logLevel <= 1) console.warn(chalk.yellow(getTime()), ...args);
};

const error = (...args) => {
  if (logLevel <= 2) console.warn(chalk.red(getTime()), ...args);
};

export const log = { info, warn, error };
