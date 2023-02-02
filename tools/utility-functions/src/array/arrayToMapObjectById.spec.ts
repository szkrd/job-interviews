import { arrayToMapObjectById } from './arrayToMapObjectById';

describe('utils/array/arrayToMapObjectById', () => {
  it('should remap an array of objects by a property to a lookup object', () => {
    const items = [
      { _id: 'foo', value: 0 },
      { _id: 'bar', value: 1 },
      { _id: 'baz', value: 2 },
    ];
    const result = arrayToMapObjectById(items);
    expect(result).toEqual({
      foo: { _id: 'foo', value: 0 },
      bar: { _id: 'bar', value: 1 },
      baz: { _id: 'baz', value: 2 },
    });
  });

  it('should be able to use any other property', () => {
    const items = [
      { animal: 'dog', name: 'fifi' },
      { animal: 'dog', name: 'butch' },
      { animal: 'cat', name: 'tabby' },
    ];
    const result = arrayToMapObjectById(items, 'name');
    expect(result).toEqual({
      fifi: { animal: 'dog', name: 'fifi' },
      butch: { animal: 'dog', name: 'butch' },
      tabby: { animal: 'cat', name: 'tabby' },
    });
  });
});
