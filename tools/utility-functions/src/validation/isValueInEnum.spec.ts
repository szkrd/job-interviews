import { mockConsole } from '../../test/mockConsole';
import { isValueInEnum } from './isValueInEnum';

enum BookStates {
  Reading = 'reading',
  Finished = 'finished',
  WantToRead = 'wantToRead',
}

enum UserRoles {
  Administrator,
  Accountant,
  Reviewer,
}

describe('isValueInEnum', () => {
  beforeAll(() => {
    mockConsole.setup();
  });

  afterAll(() => {
    mockConsole.restore();
  });

  it('should check if a value can be found in an enum', () => {
    expect(isValueInEnum(BookStates, 'reading')).toBe(true);
    expect(isValueInEnum(UserRoles, 0)).toBe(true);
  });

  it('should detect missing values', () => {
    expect(isValueInEnum(BookStates, 'foobar')).toBe(false);
    expect(isValueInEnum(UserRoles, 4)).toBe(false);
    expect(mockConsole.warn).toHaveBeenCalledTimes(2);
  });
});
