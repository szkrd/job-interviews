import { utcToLocal } from './utcToLocal';

describe('utcToLocal', () => {
  it('returns date with KR local', () => {
    const customLocaleSettings = {
      locale: 'ko-KR',
      toLocaleStringOpts: {
        timeZone: 'Europe/Kiev',
        hour12: false,
      },
    };
    const realToLocaleDateString = Date.prototype.toLocaleDateString;

    // eslint-disable-next-line no-extend-native
    Date.prototype.toLocaleDateString = jest.fn();

    const date = '2019-01-23T13:11:08.131Z';
    utcToLocal(date, false, customLocaleSettings);
    expect(Date.prototype.toLocaleDateString).toHaveBeenCalledWith(
      customLocaleSettings.locale,
      customLocaleSettings.toLocaleStringOpts
    );

    // eslint-disable-next-line no-extend-native
    Date.prototype.toLocaleDateString = realToLocaleDateString;
  });
});
