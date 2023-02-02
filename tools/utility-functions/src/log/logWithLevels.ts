/* eslint-disable @typescript-eslint/no-explicit-any */

export enum LogLevel {
  All = 0,
  WarnError = 1,
  Error = 2,
  None = 3,
}

type TConsoleMethod = 'info' | 'log' | 'warn' | 'error' | 'debug';
const LS_KEY = 'loglevel';
const PREFIX = '[App]';

const _rawLog = (action: TConsoleMethod = 'log', ...args: any[]) => {
  if (action === 'debug') return;
  console[action](`%c${PREFIX}`, 'color: purple', ...args);
};

const _log = (action: TConsoleMethod = 'log', ...args: any[]) => {
  _rawLog(action, ...args);
};

const logLevel = parseInt(localStorage.getItem(LS_KEY) || '0', 10) || 0;
console.info(`${PREFIX} log level is ${logLevel} (${LogLevel[logLevel]})`);

const info = (...args: any[]) => {
  if (logLevel <= 0) _log('info', ...args);
};

const warn = (...args: any[]) => {
  if (logLevel <= 1) _log('warn', ...args);
};

const error = (...args: any[]) => {
  if (logLevel <= 2) _log('error', ...args);
};

/**
 * Minimal console.log wrapper with loglevel support.
 */
export const log = { info, log: info, warn, error };
