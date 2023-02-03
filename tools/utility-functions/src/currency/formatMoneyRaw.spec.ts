import { formatMoneyRaw } from './formatMoneyRaw';

describe('formatMoneyRaw', () => {
  test('formats money based on a predefined template', () => {
    expect(formatMoneyRaw(1234.567, '$', 2, ',', '.', '%s%v')).toMatch('$1,234.57');
    expect(formatMoneyRaw(1234.567, 'Ft', 0, '.', ',', '%v %s')).toMatch('1.235 Ft');
  });
});
