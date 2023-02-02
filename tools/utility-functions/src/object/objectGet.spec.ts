import { objectGet } from './objectGet';

describe('utils/object/objectGet', () => {
  it('should get the value of an object property along a string JSON path', () => {
    const obj = {
      foo: {
        bar: 0,
        baz: null,
        qux: [{ a: 0 }, { a: 1 }, { a: 2 }],
      },
    };
    expect(objectGet(obj, 'foo.bar')).toBe(0);
    expect(objectGet(obj, 'foo.baz')).toBe(null);
    expect(objectGet(obj, 'foo.zzz')).toBe(undefined);
    expect(objectGet(obj, 'foo.qux[0].a')).toBe(0);
    expect(objectGet(obj, 'foo.qux.1.a')).toBe(1);
    expect(objectGet(obj, ['foo', 'qux', 2, 'a'])).toBe(2);
  });
});
