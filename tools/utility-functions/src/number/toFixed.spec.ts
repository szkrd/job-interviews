import { toFixed } from './toFixed';

describe('toFixed', () => {
  test('implementation of toFixed that treats floats more like decimals', () => {
    expect(toFixed(0.615, 2)).toEqual('0.62');
    expect(toFixed(0.00001, 3)).toEqual('0.000');
    expect(toFixed(42.4242)).toEqual('42.42');
  });
});
