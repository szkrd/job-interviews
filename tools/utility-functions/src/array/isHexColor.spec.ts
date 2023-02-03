import { isHexColor } from './isHexColor';

describe('isHexColor', () => {
  it('should detect hex colors (without alpha)', () => {
    expect(isHexColor('#333')).toBe(true);
    expect(isHexColor('#000')).toBe(true);
    expect(isHexColor('#ffddee')).toBe(true);
    expect(isHexColor('#424242')).toBe(true);

    expect(isHexColor('#424242f0')).toBe(false);
    expect(isHexColor('#ff00')).toBe(false);
    expect(isHexColor('fff')).toBe(false);
    expect(isHexColor('green')).toBe(false);
    expect(isHexColor(0)).toBe(false);
  });
});
