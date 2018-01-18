import { Injectable } from '@angular/core';

enum StorageTypes {
  SessionStorage = 'sessionStorage',
  LocalStorage = 'localStorage'
}

// poor man's deep clone
const deepClone = obj => JSON.parse(JSON.stringify(obj));

const CACHE_KEY = 'horton-entry-http-get-cache';

@Injectable()
export class StorageCacheService {
  storage = {};
  backend: StorageTypes;

  constructor (backend: StorageTypes = StorageTypes.SessionStorage) {
    this.backend = backend;
    try {
      this.storage = JSON.parse(window[this.backend].getItem(CACHE_KEY));
    } catch (err) {
      console.error(err);
    }
    this.storage = this.storage || {};
  }

  get (id: string) {
    const val = this.storage[id];
    if (typeof val === 'object') {
      return deepClone(val);
    }
    return val;
  }

  set (id: string, value) {
    this.storage[id] = value;
    window[this.backend].setItem(CACHE_KEY, JSON.stringify(this.storage));
  }
}
