import { insertAt } from './insertAt';

describe('insertAt', () => {
  test('insert a text into a string at given position', () => {
    expect(insertAt('How you?', 3, ' are')).toBe('How are you?');

    expect(insertAt('new year!', 0, 'Happy ')).toBe('Happy new year!');

    expect(insertAt('The holy', 42, ' hand grenade.')).toBe('The holy hand grenade.');
  });
});
