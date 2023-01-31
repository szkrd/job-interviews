import { kebabCase } from './kebabCase';

describe('kebabCase', () => {
  test('convert a string to kebab case', () => {
    expect(kebabCase('fooBar')).toBe('foo-bar');

    expect(kebabCase('FooBar')).toBe('foo-bar');

    expect(kebabCase('Foo_Bar')).toBe('foo-bar');

    expect(kebabCase('Foo Bar')).toBe('foo-bar');

    expect(kebabCase('Foo-Bar_baz')).toBe('foo-bar-baz');
  });
});
