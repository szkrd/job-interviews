import { nullFunc as noop } from '../function/nullFunc';
import { isNullOrUndefined as isNil } from '../validation/isNullOrUndefined';

const LOG = false;
const logMessage = LOG ? console.info : noop;
const nilFallback = (value: unknown, fallback = '') => (isNil(value) ? fallback : String(value));

function safeStorageFactory(storage: Storage, variant: 'session' | 'local') {
  let memStore: Record<string, string> = {};

  const parse = (text: string, fallback: unknown = null) => {
    if (typeof text !== 'string' || text.length === 0) return fallback;
    try {
      return JSON.parse(text);
    } catch (err) {
      logMessage(`Safe ${variant} storage JSON parse error:`, err);
      return fallback;
    }
  };

  /**
   * Get value from memory or store, uses **JSON parse**.
   */
  const getItem = (key: string, fallback: unknown = null): unknown => {
    let strValue: string = memStore[key];
    try {
      strValue = nilFallback(storage.getItem(key));
    } catch (err) {
      logMessage(`Safe ${variant} storage read error:`, err);
    }
    if (strValue === '') strValue = memStore[key];
    return parse(strValue, fallback);
  };

  /**
   * Save value to memory or store, uses **JSON stringify**.
   */
  const setItem = (key: string, value: unknown) => {
    const stringifiedValue = JSON.stringify(value);
    memStore[key] = stringifiedValue;
    try {
      storage.setItem(key, stringifiedValue);
    } catch (err) {
      logMessage(`Safe ${variant} storage write error:`, err);
    }
  };

  /**
   * Delete value to memory or store.
   */
  const removeItem = (key: string) => {
    delete memStore[key];
    try {
      storage.removeItem(key);
    } catch (err) {
      logMessage(`Safe ${variant} storage remove item error:`, err);
    }
  };

  const clear = () => {
    memStore = {};
    try {
      storage.clear();
    } catch (err) {
      logMessage(`Safe ${variant} storage clear error:`, err);
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
}

/** JSON and sessionStorage access safe wrapper around sessionStorage. */
export const safeSessionStorage = safeStorageFactory(sessionStorage, 'session');

/** JSON and localStorage access safe wrapper around localStorage. */
export const safeLocalStorage = safeStorageFactory(localStorage, 'local');
