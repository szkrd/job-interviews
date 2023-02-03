import { prettifyLongNumber } from './prettifyLongNumber';

describe('prettifyLongNumber', () => {
  test('formats long number to a pretty shortened one', () => {
    let n = 1234003;
    expect(prettifyLongNumber(n)).toMatch('1.23M');
    n = 1000000.23;
    expect(prettifyLongNumber(n)).toMatch('1M');
    n = 1500000;
    expect(prettifyLongNumber(n)).toMatch('1.5M');
    n = 1023.34;
    expect(prettifyLongNumber(n)).toMatch('1.02k');
    n = 1100;
    expect(prettifyLongNumber(n)).toMatch('1.1k');
    n = 1000.12;
    expect(prettifyLongNumber(n)).toMatch('1k');
    n = 20;
    expect(prettifyLongNumber(n)).toMatch('20');
    n = 20.993;
    expect(prettifyLongNumber(n)).toMatch('21');
    n = 9900;
    expect(prettifyLongNumber(n)).toMatch('9.9k');
    n = 8888.44;
    expect(prettifyLongNumber(n)).toMatch('8.89k');
  });
});
