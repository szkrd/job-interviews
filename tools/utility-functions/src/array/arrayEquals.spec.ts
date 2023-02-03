import { arrayEquals } from './arrayEquals';

describe('arrayEquals', () => {
  test('compares array contents, but arrays only', () => {
    const foo = [1, 2, 3, 'superman'];
    const bar = [1, 2, 3, 'superman'];

    expect(foo === bar).toBe(false);
    expect(arrayEquals(foo, bar)).toBe(true);
  });

  test('different order will be false', () => {
    const foo = [1, 3, 2, 0];
    const bar = [0, 3, 2, 1];

    expect(foo === bar).toBe(false);
    expect(arrayEquals(foo, bar)).toBe(false);
  });

  test('nested arrays', () => {
    const foo = [1, 2, [3, 4]];
    const bar = [1, 2, [3, 4]];
    expect(foo === bar).toBe(false);
    expect(arrayEquals(foo, bar)).toBe(true);
  });
});
