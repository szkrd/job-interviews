import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should have a sane default format', () => {
    expect(formatDate('2023-02-01')).toBe('2023-02-01');
  });

  it('should format dates without replacing anything unrelated to the date formatter tokens', () => {
    const result = formatDate('2022-12-02', 'YY? YYYY. ^MMMM^ /MMM/ MM! [M] DD$ ADA');
    expect(result).toBe('22? 2022. ^December^ /Dec/ 12! [12] 02$ A2A');
  });

  it('should format dates', () => {
    expect(formatDate('2023-01-13', 'MMM. D, YYYY')).toBe('Jan. 13, 2023');
  });
});
