/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatMoney } from './formatMoney';

describe('formatMoney', () => {
  it('should format USD values', () => {
    expect(formatMoney(1200000)).toBe('$1,200,000.00');
  });

  it('should format HUF values', () => {
    expect(formatMoney(1200000, 'hu-HU')).toBe('1 200 000,00 Ft');
  });

  it('should use return the number as is if the locale is broken', () => {
    expect(formatMoney(12345, '???' as any)).toBe('12345');
  });
});
