import { groupBy } from './groupBy';

describe('utils/array/groupBy', () => {
  it('should group an array of objects by a property', () => {
    const items = [
      { type: 'alpha', value: 0 },
      { type: 'alpha', value: 1 },
      { type: 'beta', value: 2 },
    ];
    const result = groupBy(items, 'type');
    expect(result).toEqual({
      alpha: [
        { type: 'alpha', value: 0 },
        { type: 'alpha', value: 1 },
      ],
      beta: [{ type: 'beta', value: 2 }],
    });
  });
});
