/* eslint-disable @typescript-eslint/no-explicit-any */
// low level session storage wrapper, always use this, instead of
// the browser's sessionStorage. Interface mimics the browser implementation.
//
// get item will return null if the storage is not available,
// set item will not throw an error, just log a message in that case

const APP_NAME = 'foobar';
const log = {
  warn: console.warn,
  error: console.error,
};

type StorageTypes = 'sessionStorage' | 'localStorage';

class Availability {
  sessionStorage: boolean = null;
  localStorage: boolean = null;
}

const availability = new Availability(); // ts (probably an object type definition would've been the same)

// checks if session or local storage is available
const isAvailable = (type: StorageTypes) => {
  if (availability[type] === null) {
    try {
      window[type].setItem(APP_NAME, APP_NAME);
      const item = window[type].getItem(APP_NAME);
      if (item !== APP_NAME) {
        throw new Error();
      }
      window[type].removeItem(APP_NAME);
      availability[type] = true;
    } catch (err) {
      log.warn(`${type} not available`, err);
      availability[type] = false;
    }
  }
};

isAvailable('sessionStorage');
isAvailable('localStorage');

interface IBrowserStore {
  isAvailable: boolean;
  isEmpty: () => boolean;
  getItem<T>(id: string): T;
  getItemRaw?(id: string): string | null; // returns an unparsed value, but is still protected by the safeguard
  setItem(id: string, value: any): void;
  removeItem(id: string): void;
  clear(): void;
}

// wrap an object of function in a way that all of its
// function calls check for the existence of a storage
function safeGuard<T>(target: T, type: StorageTypes): T {
  return Object.keys(target).reduce((acc: any, key) => {
    acc[key] = (...args) => {
      if (!availability[type]) {
        return null;
      }
      return target[key](...args);
    };
    return acc;
  }, {});
}

// ----

const simpleStorageFactory = (storage: StorageTypes): IBrowserStore => ({
  getItem: <T>(id: string) => {
    const value = window[storage].getItem(id);
    let ret: T = null;
    try {
      ret = JSON.parse(value) || null;
    } catch (err) {
      log.error(`Storage read error`, err); // json parse error?
    }
    return ret;
  },

  getItemRaw: (id: string): string | null => {
    return window[storage].getItem(id);
  },

  setItem: (id: string, value: any) => {
    const savable = JSON.stringify(value);
    try {
      window[storage].setItem(id, savable);
    } catch (err) {
      log.error(`Storage write error`, err); // quota filled?
    }
  },

  removeItem: (id: string) => {
    window[storage].removeItem(id);
  },

  clear() {
    window[storage].clear();
  },

  isAvailable: availability[storage],

  isEmpty: () => window[storage].length === 0,
});

export const simpleSessionStorage = safeGuard<IBrowserStore>(simpleStorageFactory('sessionStorage'), 'sessionStorage');
export const simpleLocalStorage = safeGuard<IBrowserStore>(simpleStorageFactory('localStorage'), 'localStorage');

export const simpleStorages = {
  simpleSessionStorage,
  simpleLocalStorage,
};
