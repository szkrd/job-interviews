import { queryString } from '../url/queryString';
import { getLocationHash } from './getLocationHash';

function getLocationHashQuery(hash?: string) {
  return getLocationHash(hash).replace(/^[^?]*\?/, '');
}

/** Updates query params stored in the location hash; does NOT support url-like prefixes */
export function updateLocationHashParams(key: string, value: string | number | boolean) {
  const currentHash = getLocationHashQuery();
  const currentObj = queryString.parse(currentHash);
  const strVal = String(value);
  if (strVal === '') {
    delete currentObj[key];
  } else {
    currentObj[key] = String(value);
  }
  const newHash = queryString.from(currentObj);
  if (newHash !== currentHash) window.location.hash = '?' + newHash;
}
