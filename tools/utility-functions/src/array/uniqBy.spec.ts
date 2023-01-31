import { uniqBy } from './uniqBy';

describe('uniqBy', () => {
  it('should return uniq items by the value of a property', () => {
    const items = [
      { id: 0, name: 'john' },
      { id: 1, name: 'jack' },
      { id: 0, name: 'john' },
      { id: 2, name: 'jill' },
      { id: 3, name: 'jane' },
    ];
    const result = uniqBy(items, 'id');
    expect(result).toEqual([
      { id: 0, name: 'john' },
      { id: 1, name: 'jack' },
      { id: 2, name: 'jill' },
      { id: 3, name: 'jane' },
    ]);
  });
});
