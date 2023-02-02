export function createPaginationRange(activePage: number, pageCount: number, range: number): number[] {
  // range 3 (odd) => `1 (2) 3` vs range 6 (even) => `1 2 3 (4) 5 6`
  const left = Math.ceil((range - 1) / 2);
  const right = Math.floor((range - 1) / 2);
  const pages: number[] = [];
  if (pageCount <= range) {
    // the count is in the range, not much to do here
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
  } else {
    // we have more pages than we can show in a given range
    let below = 0;
    let over = 0;
    for (let i = activePage - left; i <= activePage + right; i++) {
      if (i < 1) below += 1;
      if (i > pageCount) over += 1;
      pages.push(i);
    }
    if (over) {
      // we have an overflow: truncate array and prepend the missing pages
      pages.length = pages.length - over;
      for (let i = 1; i <= over; i++) {
        pages.unshift(pages[0] - i);
      }
    }
    if (below) {
      // we have an underflow: cut first N items and append the missing pages
      pages.splice(0, below);
      const last = pages[pages.length - 1];
      for (let i = 1; i <= below; i++) {
        pages.push(last + i);
      }
    }
  }
  return pages;
}
