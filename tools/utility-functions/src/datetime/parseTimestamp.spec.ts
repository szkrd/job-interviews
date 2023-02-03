/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseTimestamp } from './parseTimestamp';

describe('parseTimestamp', () => {
  it('should return null for invalid dates', () => {
    expect(parseTimestamp('foobar' as any)).toBeNull();
    expect(parseTimestamp(Infinity)).toBeNull();
  });

  it('should convert unix timestamp to js timestamp', () => {
    expect(parseTimestamp(9999999999).toISOString()).toBe('2286-11-20T17:46:39.000Z');
    expect(parseTimestamp(10000000000).toISOString()).toBe('1970-04-26T17:46:40.000Z');
  });
});
