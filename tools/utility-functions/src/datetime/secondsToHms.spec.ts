import secondsToHms from './secondsToHms';

describe('secondsToHms', () => {
  test('converts seconds to hour-minute-sec format', () => {
    expect(secondsToHms(59)).toBe('0:59');
    expect(secondsToHms(60)).toBe('1:00');
    expect(secondsToHms(70)).toBe('1:10');
    expect(secondsToHms(10000)).toBe('2:46:40');
  });

  test('converts with padding', () => {
    expect(secondsToHms(0, true)).toBe('00:00');
    expect(secondsToHms(5, true)).toBe('00:05');
    expect(secondsToHms(59, true)).toBe('00:59');
    expect(secondsToHms(60, true)).toBe('01:00');
    expect(secondsToHms(70, true)).toBe('01:10');
    expect(secondsToHms(10000, true)).toBe('02:46:40');
  });
});
