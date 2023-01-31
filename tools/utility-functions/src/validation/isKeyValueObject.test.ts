/* eslint-disable @typescript-eslint/no-explicit-any */

import { isKeyValueObject } from './isKeyValueObject';

class Dummy {
  foo = 1;
  bar = 2;
  constructor() {
    (this as any).baz = 3;
  }
}

class ChildDummy extends Dummy {}

describe('isKeyValueObject', () => {
  const fn = isKeyValueObject;
  it('should detect objects that has key value pairs', () => {
    expect(fn({})).toBe(true);
    expect(fn({ answer: 42 })).toBe(true);
    expect(fn(new Dummy())).toBe(true);
    expect(fn(new ChildDummy())).toBe(true);

    expect(fn(new Number(42))).toBe(false);
    expect(fn([1, 2, 3])).toBe(false);
    expect(fn(true)).toBe(false);
    expect(fn(new WeakMap())).toBe(false);
  });
});
