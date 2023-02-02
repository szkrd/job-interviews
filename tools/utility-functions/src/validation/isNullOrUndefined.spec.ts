import { isNullOrUndefined } from './isNullOrUndefined';

describe('isNullOrUndefined', () => {
  it('should detect nulls and undefineds', () => {
    expect(isNullOrUndefined(null)).toBe(true);
    expect(isNullOrUndefined(undefined)).toBe(true);
    expect(isNullOrUndefined(0)).toBe(false);
    expect(isNullOrUndefined('')).toBe(false);
    expect(isNullOrUndefined(false)).toBe(false);
  });
});
