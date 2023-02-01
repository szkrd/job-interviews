import { humanize } from './humanize';

describe('humanize', () => {
  it('should split camelCase text into words', () => {
    expect(humanize('movieName')).toBe('movie name');
    expect(humanize('ReleaseDate')).toBe('release date');
  });
});
