import { useEffect, useRef, useState } from 'react';
import { getLocationHashParams } from '../utils/navigation';
import { usePrevious } from './usePrevious';

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
  const prevValue = usePrevious(value);
  const firstRun = useRef(true);

  useEffect(() => {
    const onHashChange = (event?: HashChangeEvent) => {
      const url = new URL(event ? event.newURL : window.location.href);
      const params = getLocationHashParams(url.hash);
      const newValue = params[queryName];
      // since other query sections can change, let's decrease trigger happyness
      if (newValue !== prevValue) {
        setValue(newValue);
        if (typeof onChange === 'function') onChange(newValue);
      }
    };
    addEventListener('hashchange', onHashChange);
    // _logically_ this is a component did mount, so it _should_ run only once, but heck, we _do_ need this...
    if (firstRun) {
      firstRun.current = false;
      onHashChange();
    }
    return () => removeEventListener('hashchange', onHashChange);
  }, []);
  return value;
}
