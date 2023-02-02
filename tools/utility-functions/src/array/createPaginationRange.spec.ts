import { createPaginationRange } from './createPaginationRange';

describe('utils/array/createPaginationRange', () => {
  // param order:
  // +---------------+--------------+----------+
  // | 1. activePage | 2. pageCount | 3. range |
  // +---------------+--------------+----------+
  it('create page range arrays that can be used with a paginator', () => {
    // fit in range
    expect(createPaginationRange(1, 4, 4)).toEqual([1, 2, 3, 4]);
    expect(createPaginationRange(4, 4, 4)).toEqual([1, 2, 3, 4]);
    expect(createPaginationRange(10, 20, 5)).toEqual([8, 9, 10, 11, 12]);

    // no overflow, no underflow
    expect(createPaginationRange(5, 10, 4)).toEqual([3, 4, 5, 6]); // even
    expect(createPaginationRange(38, 100, 5)).toEqual([36, 37, 38, 39, 40]); // odd
    expect(createPaginationRange(20, 100, 7)).toEqual([17, 18, 19, 20, 21, 22, 23]);

    // underflow
    expect(createPaginationRange(2, 10, 4)).toEqual([1, 2, 3, 4]); // even
    expect(createPaginationRange(5, 10, 7)).toEqual([2, 3, 4, 5, 6, 7, 8]); // odd

    // overflow
    expect(createPaginationRange(8, 10, 4)).toEqual([6, 7, 8, 9]); // even
    expect(createPaginationRange(19, 20, 5)).toEqual([16, 17, 18, 19, 20]); // odd
  });
});
