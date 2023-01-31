import { escapeRegExp, newRex } from './escapeRegExp';

describe('RegExp escapes', () => {
  describe('escapeRegExp', () => {
    it('should escape regexp characters in string', () => {
      const text = 'Foo /bar/ /bar/ baz .? qux';

      expect(escapeRegExp('/bar/')).toBe('\\/bar\\/');

      let rex = new RegExp(escapeRegExp('/bar/'), 'gi');
      expect(text.replace(rex, 'x')).toBe('Foo x x baz .? qux');

      rex = new RegExp(escapeRegExp('.?'), 'gi');
      expect(text.replace(rex, 'y')).toBe('Foo /bar/ /bar/ baz y qux');
    });
  });

  describe('newRex', () => {
    it('should create a RegExp object from a string', () => {
      expect('.a.b.c.'.replace(newRex('.', 'g'), '_')).toBe('_a_b_c_');
    });
  });
});
