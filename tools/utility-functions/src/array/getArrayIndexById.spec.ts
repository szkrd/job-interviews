import { getArrayIndexById } from './getArrayIndexById';

describe('getArrayIndexById', () => {
  it("should return the index of an item by the object's id prop in an array", () => {
    const elements = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Jack' },
    ];
    expect(getArrayIndexById(elements, 2)).toBe(1);
  });

  it('should allow specifying the name of the key', () => {
    const elements = [
      { uid: 1, meta: 'Foo' },
      { uid: 2, meta: 'Baz' },
      { uid: 3, meta: 'Corge' },
      { uid: 4, meta: 'Xyzzy' },
    ];
    expect(getArrayIndexById(elements, 2, 'uid')).toBe(1);
  });
});
