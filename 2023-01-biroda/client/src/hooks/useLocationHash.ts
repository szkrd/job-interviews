import { useEffect, useRef, useState } from 'react';
import { getLocationHashParams } from '../utils/navigation';

/**
 * Subscribe to location hash changes and get the given
 * query param from the hash part (which we treat as
 * window.location.query, in the manner of a poor man's
 * html5 history - though it's much simpler than that)
 *
 * @param queryName   name of the (fake) query param, eg. '#?foo=qux' -> the name is 'foo'
 * @param onChange    optional callback that is called with the new value
 */
export function useLocationHash(queryName: string, onChange?: (val: string | undefined) => void) {
  const firstValue = getLocationHashParams()[queryName];
  const [value, setValue] = useState<string | undefined>(firstValue);
  const prevValue = useRef('');

  useEffect(() => {
    const onHashChange = (event?: HashChangeEvent) => {
      if (!event || event?.newURL === event?.oldURL) return;
      const url = new URL(event ? event.newURL : window.location.href);
      const params = getLocationHashParams(url.hash);
      const newValue = params[queryName];
      // since other query sections can change, let's decrease trigger happyness
      if (newValue !== prevValue?.current) {
        prevValue.current = newValue;
        setValue(newValue);
        if (typeof onChange === 'function') onChange(newValue);
      }
    };
    addEventListener('hashchange', onHashChange);
    return () => removeEventListener('hashchange', onHashChange);
  }, []);
  return value;
}
