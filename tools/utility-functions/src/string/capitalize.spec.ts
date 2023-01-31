import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should convert the first character of a string to uppercase', () => {
    expect(capitalize('foobar')).toBe('Foobar');
    expect(capitalize('baz qux')).toBe('Baz qux');
  });
});
