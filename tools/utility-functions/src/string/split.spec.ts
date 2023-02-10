import { split } from './split';

describe('split', () => {
  it('should split a string into two', () => {
    expect(split('foo,bar,baz', ',')).toEqual(['foo', 'bar,baz']);
    expect(split('John Doe', ' ')).toEqual(['John', 'Doe']);
  });

  it('should split a string to multiple parts', () => {
    expect(split('foo, bar, baz', ', ', true)).toEqual(['foo', 'bar', 'baz']);
  });
});
