/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryString } from './queryString';

describe('queryString', () => {
  it('should parse a query string into an object', () => {
    expect(queryString.parse('?foo=1&bar=2')).toEqual({ foo: '1', bar: '2' });
  });

  it('should convert an object into a url query string', () => {
    expect(queryString.from({ foo: '1', bar: '2' })).toEqual('foo=1&bar=2');
  });

  it('should not support arrays', () => {
    expect(queryString.parse('?foo=1&foo=2&foo=3')).toEqual({ foo: '3' });
    expect(queryString.from({ foo: [1, 2, 3] } as any)).toBe('foo=' + encodeURIComponent('1,2,3'));
  });
});
