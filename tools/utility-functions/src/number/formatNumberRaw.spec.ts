import { formatNumberRaw } from './formatNumberRaw';

describe('formatNumberRaw', () => {
  // test cases are from accounting.js
  // (without option merging and multiple input values)
  test('format number to string', () => {
    expect(formatNumberRaw(123.456789)).toBe('123.46');
    expect(formatNumberRaw(123.1, 2)).toBe('123.10');
    expect(formatNumberRaw(123.456789, 0)).toBe('123');
    expect(formatNumberRaw(123.456789, 1)).toBe('123.5');
    expect(formatNumberRaw(123.456789, 2)).toBe('123.46');
    expect(formatNumberRaw(123.456789, 3)).toBe('123.457');
    expect(formatNumberRaw(123.456789, 4)).toBe('123.4568');
    expect(formatNumberRaw(123.456789, 5)).toBe('123.45679');
    expect(formatNumberRaw(0.615, 2)).toBe('0.62');
    expect(formatNumberRaw(0.614, 2)).toBe('0.61');
    expect(formatNumberRaw(1.005, 2)).toBe('1.01');
    expect(formatNumberRaw(123456.54321, 0)).toBe('123,457');
    expect(formatNumberRaw(123456.54321, 1)).toBe('123,456.5');
    expect(formatNumberRaw(123456.54321, 2)).toBe('123,456.54');
    expect(formatNumberRaw(123456.54321, 3)).toBe('123,456.543');
    expect(formatNumberRaw(123456.54321, 4)).toBe('123,456.5432');
    expect(formatNumberRaw(123456.54321, 5)).toBe('123,456.54321');
    expect(formatNumberRaw(98765432.12, 0)).toBe('98,765,432');
    expect(formatNumberRaw(98765432.12, 1)).toBe('98,765,432.1');
    expect(formatNumberRaw(98765432.12, 2)).toBe('98,765,432.12');
    expect(formatNumberRaw(98765432.12, 3)).toBe('98,765,432.120');
    expect(formatNumberRaw(98765432.12, 4)).toBe('98,765,432.1200');
    expect(formatNumberRaw(-123456.54321, 0)).toBe('-123,457');
    expect(formatNumberRaw(-123456.54321, 1)).toBe('-123,456.5');
    expect(formatNumberRaw(-123456.54321, 2)).toBe('-123,456.54');
    expect(formatNumberRaw(-123456.54321, 3)).toBe('-123,456.543');
    expect(formatNumberRaw(-123456.54321, 4)).toBe('-123,456.5432');
    expect(formatNumberRaw(-123456.54321, 5)).toBe('-123,456.54321');
    expect(formatNumberRaw(-98765432.12, 0)).toBe('-98,765,432');
    expect(formatNumberRaw(-98765432.12, 1)).toBe('-98,765,432.1');
    expect(formatNumberRaw(-98765432.12, 2)).toBe('-98,765,432.12');
    expect(formatNumberRaw(-98765432.12, 3)).toBe('-98,765,432.120');
    expect(formatNumberRaw(-98765432.12, 4)).toBe('-98,765,432.1200');
    expect(formatNumberRaw(98765432.12, 0, '|')).toBe('98|765|432');
    expect(formatNumberRaw(98765432.12, 1, '>')).toBe('98>765>432.1');
    expect(formatNumberRaw(98765432.12, 2, '*')).toBe('98*765*432.12');
    expect(formatNumberRaw(98765432.12, 3, "'")).toBe("98'765'432.120");
    expect(formatNumberRaw(98765432.12, 4, ']')).toBe('98]765]432.1200');
    expect(formatNumberRaw(98765432.12, 0, ',', '|')).toBe('98,765,432');
    expect(formatNumberRaw(98765432.12, 1, ',', '>')).toBe('98,765,432>1');
    expect(formatNumberRaw(98765432.12, 2, ',', '*')).toBe('98,765,432*12');
    expect(formatNumberRaw(98765432.12, 3, ',', "'")).toBe("98,765,432'120");
    expect(formatNumberRaw(98765432.12, 4, ',', ']')).toBe('98,765,432]1200');
    expect(formatNumberRaw(98765432.12, 0, '\\', '|')).toBe('98\\765\\432');
    expect(formatNumberRaw(98765432.12, 1, '<', '>')).toBe('98<765<432>1');
    expect(formatNumberRaw(98765432.12, 2, '&', '*')).toBe('98&765&432*12');
    expect(formatNumberRaw(98765432.12, 3, '"', "'")).toBe('98"765"432\'120');
    expect(formatNumberRaw(98765432.12, 4, '[', ']')).toBe('98[765[432]1200');
    expect(formatNumberRaw(12345.12345, 2, ',', '.')).toBe('12,345.12');
    expect(formatNumberRaw(12345.12345, 2, '', '')).toBe('1234512');
  });
});
