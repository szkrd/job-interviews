import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  const sessionStorage = new SessionStorageService();
  const clear = () => window.sessionStorage.clear;

  beforeEach(clear);
  afterEach(clear);

  it('should be able to set an item in the browser session storage', () => {
    sessionStorage.setItem('foo', 'bar');
    expect(window.sessionStorage.getItem('foo')).toBe('bar');
  });

  it('should be able to get an item from the browser session storage', () => {
    window.sessionStorage.setItem('qux', 'corge');
    const result = sessionStorage.getItem('qux');
    expect(result).toBe('corge');
  });
});
