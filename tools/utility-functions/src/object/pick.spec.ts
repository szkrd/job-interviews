import { pick } from './pick';

describe('pick', () => {
  test('returns part of an object with parameters spread', () => {
    const foo = {
      bar: 1,
      baz: 2,
      qux: 3,
      quux: 4,
      quuz: 5,
      'corge.garply': 6,
    };
    const result = pick(foo, 'bar', 'baz', 'quuz', 'corge.garply');
    expect(result).toEqual({ bar: 1, baz: 2, quuz: 5, 'corge.garply': 6 });
  });
});
