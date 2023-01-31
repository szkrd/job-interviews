import { uniq } from './uniq';

describe('uniq', () => {
  it('should keep unique elements in an array', () => {
    expect(uniq([1, 2, 1, 3, 3, 3])).toEqual([1, 2, 3]);
  });
});
