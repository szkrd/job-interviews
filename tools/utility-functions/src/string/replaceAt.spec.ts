import { replaceAt } from './replaceAt';

describe('replaceAt', () => {
  test('Replaces characters in a string', () => {
    expect(replaceAt('catman', 0, 'b')).toBe('batman');

    expect(replaceAt('rat', 2, 'p')).toBe('rap');

    expect(replaceAt('dog food', 0, 'cat')).toBe('cat food');
  });
});
