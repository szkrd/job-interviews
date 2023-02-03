import { arrayWithout } from './arrayWithout';

describe('arrayWithout', () => {
  test('returns an array without the passed list of items', () => {
    const heroesAndFruits = ['batman', 'orange', 'spiderman', 'melon'];
    const fruits = ['apple', 'orange', 'melon'];

    const heroes = arrayWithout(heroesAndFruits, fruits);
    expect(heroes).toEqual(['batman', 'spiderman']);
  });
});
