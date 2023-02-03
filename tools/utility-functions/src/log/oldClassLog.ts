/* eslint-disable @typescript-eslint/no-explicit-any */
/* [not working] */

// import DebugFlags from '../../enums/DebugFlags';
// import { IS_PRODUCTION } from '../../config';

enum DebugFlags {
  LogLevel = '',
  LogTimeStamp = '',
}
const IS_PRODUCTION = false; // compat

type TConsoleMethodName = 'trace' | 'log' | 'info' | 'warn' | 'error';

enum Levels {
  TRACE = 0,
  LOG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  SILENT = 5,
}

class Log {
  protected level: Levels = Levels.SILENT;
  protected timestamp = false;

  constructor() {
    const overrideLevel = this.asNumber(this.localStorageGet(DebugFlags.LogLevel));
    this.timestamp = this.asBool(this.localStorageGet(DebugFlags.LogTimeStamp));

    this.level = IS_PRODUCTION ? Levels.ERROR : Levels.TRACE;
    if (overrideLevel >= 0) {
      this.level = overrideLevel;
    }

    /* tslint:disable-next-line:no-console */
    console.info(`log level is ${this.level} (${Levels[this.level]})`);
  }

  log(...args: any[]) {
    this.proxy('log', args);
  }

  trace(...args: any[]) {
    this.proxy('trace', args);
  }

  debug(...args: any[]) {
    // alias for log
    this.proxy('log', args);
  }

  info(...args: any[]) {
    this.proxy('info', args);
  }

  warn(...args: any[]) {
    this.proxy('warn', args);
  }

  error(...args: any[]) {
    this.proxy('error', args);
  }

  protected proxy(methodName: TConsoleMethodName, args: any[]) {
    //                      0       1       2       3       4
    const methodLevel = ['trace', 'log', 'info', 'warn', 'error'].indexOf(methodName);
    if (methodLevel < this.level) {
      return;
    }
    if (this.timestamp) {
      const ts = new Date().toISOString();
      if ((args[0] + '').startsWith('%c%s')) {
        // protect console coloring
        args[0] = args[0].replace(/^%c%s/, `${ts} %c%s`);
      } else {
        args.unshift(ts);
      }
    }
    console[methodName](...args);
  }

  // we can't use the simpleLocalStorage function, since this
  // Log class will be instanciated way too early in the
  // webpack/import dependency chain
  protected localStorageGet(id: string): string | null {
    return window.localStorage.getItem(id);
  }

  protected asBool(s = '') {
    return /^true|yes|1|ok$/i.test(s);
  }

  protected asNumber(s = '0') {
    const isSingleDigit = typeof s === 'string' && s.length === 1 && /^\d$/.test(s);
    return isSingleDigit ? parseInt(s, 10) : -1;
  }
}

export const oldClassLog = new Log();
