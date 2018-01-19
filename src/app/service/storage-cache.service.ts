import { Injectable } from '@angular/core';
import {BROWSER_CACHE_STORAGE, CACHE_KEY} from '../app.constants';

enum StorageTypes {
  sessionStorage = 'sessionStorage',
  localStorage = 'localStorage'
}

// poor man's deep clone
const deepClone = obj => JSON.parse(JSON.stringify(obj));

@Injectable()
export class StorageCacheService {
  storage = {};
  backend: StorageTypes = StorageTypes[BROWSER_CACHE_STORAGE];

  constructor () {
    if (!this.backend) {
      throw new Error('Storage backend not implemented.');
    }
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
