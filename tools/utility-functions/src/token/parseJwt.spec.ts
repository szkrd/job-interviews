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

  it('should decode a JWT token and ignore the expiry date', () => {
    const text = [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
      'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    ].join('.');
    const token = parseJwt(text, false);
    expect(token).toEqual({ sub: '1234567890', name: 'John Doe', iat: 1516239022 });
  });

  it('should return null for invalid tokens', () => {
    expect(parseJwt('foo.bar.baz')).toBeNull();
    expect(parseJwt('xyzzy')).toBeNull();
  });

  it('should return null for expired tokens', () => {
    const text = [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjN9',
      'NOUocIfaeHejlAo3QDaWSH0tNJEupC1tVrgpPFz6470',
    ].join('.');
    expect(parseJwt(text)).toBeNull();
  });

  it('should ignore the expiry if the exp data is not set (never expire)', () => {
    const text = [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMjkwMjJ9',
      '9oq8tpLBA02aVO5qe2NtgHrIRmJ7-jS85J6KXM2SBZE',
    ].join('.');
    expect((parseJwt(text) as any).name).toBe('John Doe');
  });
});
