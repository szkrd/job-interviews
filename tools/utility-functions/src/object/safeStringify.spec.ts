/* eslint-disable @typescript-eslint/no-explicit-any */

import { safeStringify } from './safeStringify';

describe('utils/object/safeStringify', () => {
  it('should stringify objects without their circular elements', () => {
    const foo: any = {};
    foo.foo = foo;
    foo.bar = 42;
    const result = safeStringify(foo);
    expect(result).toBe('{"bar":42}');
  });
});
