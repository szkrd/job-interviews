import parseLabel from './parseLabel';

describe('parseLabel', () => {
  it('should replace Windows style "variables" in strings from an object\'s values', () => {
    expect(parseLabel('Hello %name%!', { name: 'John' })).toBe('Hello John!');
    expect(parseLabel('Hello %NAME%!', { name: 'Jane' })).toBe('Hello Jane!');
    expect(parseLabel('Hello {nAmE}!', { name: 'Jill' })).toBe('Hello Jill!');
  });
});
