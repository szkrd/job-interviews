import { parseRawRoutePath } from './parseRawRoutePath';

describe('parseRawRoutePath', () => {
  test('replaces colon markers in react router path strings', () => {
    expect(parseRawRoutePath('/foo/:param/baz', ['bar'])).toBe('/foo/bar/baz');

    expect(parseRawRoutePath('/channel/:userId/:channelVideoTab(original|curated)?', ['QpB5YDrzbKr', 'curated'])).toBe(
      '/channel/QpB5YDrzbKr/curated'
    );
  });

  it('should not care about anything after the colon', () => {
    expect(parseRawRoutePath('/name/:/:/:', ['john', 'doe', 'dagobert'])).toBe('/name/john/doe/dagobert');
  });

  it('should collapse empty parts', () => {
    expect(parseRawRoutePath('/channel/:userId/:channelVideoTab(original|curated)?', ['QpB5YDrzbKr'])).toBe(
      '/channel/QpB5YDrzbKr'
    );
  });
});
