import { isGeneratorFunction } from './isGeneratorFunction';

function* foo(index) {
  while (index < 2) {
    yield index;
    index++;
  }
}

function bar() {
  return 42;
}

describe('isGeneratorFunction', () => {
  it('should detect iterator fucntions', () => {
    expect(isGeneratorFunction(foo)).toBe(true);
    expect(isGeneratorFunction(bar)).toBe(false);
    expect(isGeneratorFunction({})).toBe(false);
  });
});
