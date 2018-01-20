import { StorageCacheService } from './storage-cache.service';
import { SessionStorageService } from './session-storage.service';
import createSpy = jasmine.createSpy;
import { CACHE_KEY } from '../app.constants';

class MockSessionStorageService implements SessionStorageService {
  getItem = createSpy('getItem').and.callFake((id) => '{"foo":{"bar":"baz"}}');
  setItem = createSpy('setItem');
}

describe('StorageCacheService', () => {
  let sessionStorage: MockSessionStorageService;

  beforeEach(() => {
    sessionStorage = new MockSessionStorageService();
  });

  it('should retrieve the last state from the storage backend', () => {
    const cache = new StorageCacheService(sessionStorage);
    expect(sessionStorage.getItem).toHaveBeenCalledWith(CACHE_KEY);
    expect(cache.storage).toEqual({ foo: { bar: 'baz' } });
  });

  it('should retrieve values from the cache', function () {
    const cache = new StorageCacheService(sessionStorage);
    const result = cache.get('foo');
    expect(result).toEqual({ bar: 'baz' });
  });

  it('should never return the same reference', function () {
    const cache = new StorageCacheService(sessionStorage);
    const resultA = cache.get('foo');
    const resultB = cache.get('foo');
    expect(resultA).not.toBe(resultB);
  });

  it('should be able to store values in the cache backend in a serialized format', function () {
    const cache = new StorageCacheService(sessionStorage);
    const value = { bar: 'baz' };
    cache.set('foo', value);
    expect(sessionStorage.setItem).toHaveBeenCalledWith(CACHE_KEY, '{"foo":{"bar":"baz"}}');
  });
});
