import { stripProto } from './stripProto';

describe('utils/url/stripProto', () => {
  it('should remove the protocol prefix from a url', () => {
    let result = stripProto('https://foo.bar/');
    expect(result).toBe('//foo.bar/');

    result = stripProto('http://foo.bar/');
    expect(result).toBe('//foo.bar/');
  });
});
