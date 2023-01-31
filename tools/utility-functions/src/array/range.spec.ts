import { range } from './range';

describe('range', () => {
  it('should return a range of numbers in an array', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  test('with step specified', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  test('with negative ranges', () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  test('with only the end specified', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(-5)).toEqual([0, -1, -2, -3, -4]);
  });

  test('edge cases', () => {
    expect(range(0, 0)).toEqual([]);
  });

  it('can be used for ad hoc map iteration', () => {
    const pattern = range(10)
      .map(() => '-')
      .join('_');
    expect(pattern).toBe('-_-_-_-_-_-_-_-_-_-');
  });
});
