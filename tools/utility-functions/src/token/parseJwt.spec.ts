/* eslint-disable @typescript-eslint/no-explicit-any */

import { mockConsole } from '../../test/mockConsole';
import { parseJwt } from './parseJwt';

describe('token/parseJwt', () => {
  let oldWindow: any;

  beforeAll(() => {
    mockConsole.setup();
    oldWindow = global.window;
    (global as any).window = { atob };
  });

  afterAll(() => {
    global.window = oldWindow;
    mockConsole.restore();
  });

  it('should decode a JWT token', () => {
    const text = [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
      'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    ].join('.');
    const token = parseJwt(text);
    expect(token).toEqual({ sub: '1234567890', name: 'John Doe', iat: 1516239022 });
  });

  it('should return null for invalid tokens', () => {
    expect(parseJwt('foo.bar.baz')).toBeNull();
    expect(parseJwt('xyzzy')).toBeNull();
  });
});
