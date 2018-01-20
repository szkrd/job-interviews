import { Injectable } from '@angular/core';
import { CACHE_KEY } from '../app.constants';
import { SessionStorageService } from './session-storage.service';

// poor man's deep clone
const deepClone = obj => JSON.parse(JSON.stringify(obj));

@Injectable()
export class StorageCacheService {
  storage = {};

  constructor (private backend: SessionStorageService) {
    try {
      this.storage = JSON.parse(this.backend.getItem(CACHE_KEY));
    } catch (err) {
      console.error('Could not read storage.', err);
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
    try {
      this.backend.setItem(CACHE_KEY, JSON.stringify(this.storage));
    } catch (err) {
      console.warn('Could not write storage.', err);
    }
  }
}
