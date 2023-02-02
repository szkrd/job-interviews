import { asBoolean } from './asBoolean';

describe('utils/string/asBoolean', () => {
  it('should cast truthy expressions to boolean true', () => {
    expect(asBoolean('1')).toBe(true);
    expect(asBoolean('ok')).toBe(true);
    expect(asBoolean('yes')).toBe(true);
    expect(asBoolean('true')).toBe(true);
    expect(asBoolean('')).toBe(false);
    expect(asBoolean('0')).toBe(false);
    expect(asBoolean('foobar')).toBe(false);
    expect(asBoolean('false')).toBe(false);
  });
});
