import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

const getFileName = (resourceName) =>
  join(dirname(process.argv[1]), 'data', resourceName + '.json');

const fromFile = (resourceName) => {
  const fn = getFileName(resourceName);
  let text = '';
  try {
    text = String(readFileSync(fn, 'utf-8')).trim();
  } catch {
    console.warn(`Could not read file data source "${resourceName}"`);
  }
  let ret = null;
  if (text) ret = JSON.parse(text); // this can break
  return ret;
};

const toFile = (resourceName, data) => {
  writeFileSync(getFileName(resourceName), JSON.stringify(data, null, 2), 'utf-8');
};

const findBy = (resources = [], criteria = {}) => {
  return resources.filter((res) => {
    const keys = Object.keys(criteria);
    for (let idx = 0; idx < keys.length; idx++) {
      const key = keys[idx];
      if (criteria[key] !== res[key]) return false;
    }
    return true;
  });
};

function getObject(resourceName, criteria = {}) {
  const data = fromFile(resourceName) || [];
  if (!criteria || Object.keys(criteria).length === 0) return data;
  return findBy(data, criteria);
}

function useObject(resourceName, fn) {
  const data = fromFile(resourceName) || [];
  const mod = fn(data); // either mutate or recreate
  toFile(resourceName, Array.isArray(mod) ? mod : data);
}

function updateObject(resourceName, criteria, update) {
  useObject(resourceName, (data) => {
    const foundItems = findBy(data, criteria);
    foundItems.forEach((foundItem) => Object.assign(foundItem, update));
  });
}

// ----------------------------------------------------------------------------

export const dao = {
  initResource: (resourceName, data) => {
    if (!existsSync(getFileName(resourceName))) toFile(resourceName, data);
  },
  getUsers: (criteria = {}) => getObject('users', criteria),
  updateUser: (id, data) => updateObject('users', { id }, data),
};
