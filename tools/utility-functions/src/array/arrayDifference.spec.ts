import { arrayDifference } from './arrayDifference';

describe('arrayDifference', () => {
  test('subtracts the second array from the first', () => {
    const foo = [1, 2, 3, 4, 5];
    const bar = [1, 4, 9];
    const result = arrayDifference(foo, bar);
    expect(result).toEqual([2, 3, 5]);
  });

  test('it also allows custom equality checks', () => {
    const foo = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    const bar = [{ id: 1 }, { id: 4 }, { id: 9 }];
    const result = arrayDifference(foo, bar, (a, b) => a.id === b.id);
    expect(result).toEqual([{ id: 2 }, { id: 3 }, { id: 5 }]);
  });
});
