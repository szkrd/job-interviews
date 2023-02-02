import { isMongoId } from './isMongoId';

describe('isMongoId', () => {
  it('should detect mongo ids', () => {
    expect(isMongoId(null)).toBe(false);
    expect(isMongoId('63dbbaad2740d930ca99ee21')).toBe(true);
  });
});
