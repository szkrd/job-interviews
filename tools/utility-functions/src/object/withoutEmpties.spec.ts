import { withoutEmpties } from './withoutEmpties';

describe('utils/object/withoutEmpties', () => {
  it('should remove nulls and undefineds from objects', () => {
    expect(withoutEmpties({ foo: null, bar: undefined, baz: 42 })).toEqual({
      baz: 42,
    });
  });
  it('should NOT remove other falsy values', () => {
    const doNotChange = { foo: '', bar: false, baz: 0 };
    expect(withoutEmpties(doNotChange)).toEqual(doNotChange);
  });
  it('should NOT mutate the original', () => {
    const input = { foo: 1 };
    const output = withoutEmpties(input);
    expect(output).not.toBe(input);
    expect(output).toEqual({ foo: 1 });
  });
  it("should filter out empty strings if that's what you want", () => {
    const result = withoutEmpties({ foo: 1, bar: undefined, baz: '' }, true);
    expect(result).toEqual({ foo: 1 });
  });
});
