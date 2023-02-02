import { addQueryStringToUrl } from './addQueryStringToUrl';

describe('utils/string/addQueryStringToUrl', () => {
  it('should append strings to a url as query params', () => {
    let url = 'http://foo.bar/baz?ca=123';
    let result = addQueryStringToUrl(url, 'id=456');
    expect(result).toBe('http://foo.bar/baz?ca=123&id=456');

    result = addQueryStringToUrl(url, '?id=456');
    expect(result).toBe('http://foo.bar/baz?ca=123&id=456');

    result = addQueryStringToUrl(url, '&id=456');
    expect(result).toBe('http://foo.bar/baz?ca=123&id=456');

    url = 'http://foo.bar/baz';
    result = addQueryStringToUrl(url, 'id=456');
    expect(result).toBe('http://foo.bar/baz?id=456');

    url = 'http://foo.bar/baz';
    result = addQueryStringToUrl(url, '?id=456');
    expect(result).toBe('http://foo.bar/baz?id=456');

    url = 'http://foo.bar/baz?ca=123&base=789';
    result = addQueryStringToUrl(url, 'id=456');
    expect(result).toBe('http://foo.bar/baz?ca=123&base=789&id=456');
  });
});
