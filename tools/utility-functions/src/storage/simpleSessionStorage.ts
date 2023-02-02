/* eslint-disable @typescript-eslint/no-explicit-any */

let memStore: Record<string, string> = {};

// with Next the logger will always run on the server with no session storage, se let's keep this turned off by default
const ALLOW_LOG = false;

// to avoid a premature circular dependency, we will have to hardcode the console here
const logError = (...messages: any[]) => {
  if (ALLOW_LOG) console.error('[simpleSessionStorage]', ...messages);
};

const parse = (text: string, fallback: any = null) => {
  if (typeof text !== 'string' || text.length === 0) return fallback;
  try {
    return JSON.parse(text);
  } catch (err) {
    logError('JSON parse error with storage access:', err);
    return fallback;
  }
};

const getItem = (key: string): any => {
  let strValue: string = memStore[key] || '';
  try {
    strValue = sessionStorage.getItem(key) || '';
  } catch (err) {
    logError('Session storage read error:', err);
  }
  return parse(strValue || memStore[key], null);
};

const setItem = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value);
  memStore[key] = stringifiedValue;
  try {
    sessionStorage.setItem(key, stringifiedValue);
  } catch (err) {
    logError('Session storage write error:', err);
  }
};

const removeItem = (key: string) => {
  delete memStore[key];
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    logError('Session storage remove item error:', err);
  }
};

const clear = () => {
  memStore = {};
  try {
    sessionStorage.clear();
  } catch (err) {
    logError('Session storage clear error:', err);
  }
};

export const simpleSessionStorage = {
  getItem,
  setItem,
  removeItem,
  clear,
};
