import { decapitalize } from './decapitalize';

describe('decapitalize', () => {
  it('should convert the first character of a string to lowercase', () => {
    expect(decapitalize('Foobar')).toBe('foobar');
    expect(decapitalize('Baz qux')).toBe('baz qux');
  });
});
