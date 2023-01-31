/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryStringArr } from './queryStringArr';

describe('queryString', () => {
  it('should parse a simple query string into an object', () => {
    expect(queryStringArr.parse('?foo=1&bar=2')).toEqual({ foo: '1', bar: '2' });
  });

  it('should parse query strings with arrays into objects', () => {
    expect(queryStringArr.parse('?foo=1&bar=2&bar=3&bar=4')).toEqual({ foo: '1', bar: ['2', '3', '4'] });
  });

  it('should convert an object that has arrays into a url query string', () => {
    expect(queryStringArr.from({ foo: '1', bar: '2', baz: [1, 2, 3, 4] })).toEqual(
      'foo=1&bar=2&baz=1&baz=2&baz=3&baz=4'
    );
  });

  it('should not convert anything that has no key value pairs', () => {
    expect(queryStringArr.from(new Number(12))).toEqual('');
  });
});
