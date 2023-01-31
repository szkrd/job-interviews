import { truncateText } from './truncateText';

describe('truncateText', () => {
  test('Truncates a string and add ellipsis if needed', () => {
    expect(truncateText('Flux capacitor.', 8, '')).toBe('Flux cap');
    expect(truncateText('Buy milk and bread.', 8, '...')).toBe('Buy milk...');
    expect(truncateText('Batman.', 99)).toBe('Batman.');
    expect(truncateText('The holy handgrenade was here.', 8)).toBe('The holy…');
  });
});
