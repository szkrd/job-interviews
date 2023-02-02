import { chunkArray } from './chunkArray';

describe('chunkArray', () => {
  it('should divide the array into many subarrays', () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    expect(chunkArray(items, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    expect(chunkArray(items, 5)).toEqual([
      [1, 2, 3, 4, 5],
      [6, 7],
    ]);
  });
});
