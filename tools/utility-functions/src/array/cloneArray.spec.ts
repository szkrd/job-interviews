import { cloneArray } from './cloneArray';

describe('cloneArray', () => {
  test('it should shallow clone an array', () => {
    const foo = [1, 2, 3];
    const result = cloneArray(foo);
    expect(result).toEqual(foo);
    expect(result).not.toBe(foo);

    result[0] = 42;
    expect(result).toEqual([42, 2, 3]);
    expect(foo).toEqual([1, 2, 3]);
  });
});
