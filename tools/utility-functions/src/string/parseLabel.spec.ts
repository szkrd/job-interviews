import { parseLabel } from './parseLabel';

describe('parseLabel', () => {
  it('should replace Windows style "variables" in strings from an object\'s values', () => {
    expect(parseLabel('Hello %name%!', { name: 'John' })).toBe('Hello John!');
    expect(parseLabel('Hello %NAME%!', { name: 'Jane' })).toBe('Hello Jane!');
  });

  it('should be able to use custom wrapper characters', () => {
    const text = 'The Holy {ITEM}.';
    const replacers = { item: 'Handgrenade' };
    const result = parseLabel(text, replacers, '{', '}');
    expect(result).toBe('The Holy Handgrenade.');
  });

  it('should work with string arrays (because we use Object.keys)', () => {
    const text = 'Shopping list: {0}, {1}, {2}.';
    const replacers = ['apple', 'banana', 'orange'];
    const result = parseLabel(text, replacers, '{', '}');
    expect(result).toBe('Shopping list: apple, banana, orange.');
  });
});
