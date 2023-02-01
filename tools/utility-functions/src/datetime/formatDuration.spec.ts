import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
  it('should convert minutes to hours and minutes', () => {
    expect(formatDuration(15)).toBe('15m');
    expect(formatDuration(30)).toBe('30m');
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(120)).toBe('2h');
    expect(formatDuration(432)).toBe('7h 12m'); // just tarr bela things
  });
});
