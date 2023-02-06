import { parseIntSafe } from './parseIntSafe';

describe('parseIntSafe', () => {
  it('should convert anything to a number with a fallback value', () => {
    expect(parseIntSafe('42', -1)).toBe(42);
    expect(parseIntSafe('42.1234567890', -1)).toBe(42);
    expect(parseIntSafe(null, -1)).toBe(-1);
    expect(parseIntSafe(undefined, -1)).toBe(-1);
    expect(parseIntSafe('foobar', -1)).toBe(-1);
    expect(parseIntSafe(-Infinity, -123)).toBe(-123);
  });
});
