/* [not working] */

// these are safeguards! should we migrate to an en_GB format
// these (along with the localstorage value) must be replaced
type TSupportedLanguages = 'en' | 'hu';
export const supportedLanguages: TSupportedLanguages[] = ['en', 'hu'];
export const defaultLang = 'en';

export type TSupportedCurrencies = 'USD' | '?';
export const supportedCurrencies: TSupportedCurrencies[] = ['USD'];

export interface ICurrency {
  symbol: string;
  precision: number;
}

export interface ILocale {
  labelResourceUrl: string;
  thousandSeparator: string;
  decimalSeparator: string;
  currencyFormat: string;
  shortPrettyFromDate: string[];
}

interface ILocaleMeta {
  locales: { [key: string]: ILocale };
  currencies: { [key: string]: ICurrency };
}

// for locale data see https://github.com/prepair/locale-support
// or https://www.localeplanet.com/
export const localeMetaData: ILocaleMeta = {
  locales: {
    en: {
      // WARNING! resource urls are strings resolved by the file loader webpack plugin
      labelResourceUrl: 'http://resource.url/en', // require('../labels/en.js'),
      thousandSeparator: ',',
      decimalSeparator: '.',
      currencyFormat: '%s%v',
      shortPrettyFromDate: ['s', 'm', 'h', 'd', 'w', 'mo', 'y'],
    },
    hu: {
      labelResourceUrl: 'http://resource.url/hu', // require('../labels/hu.js'),
      thousandSeparator: ' ',
      decimalSeparator: ',',
      currencyFormat: '%v %s',
      shortPrettyFromDate: ['mp', 'p', 'ó', 'n', 'h', 'hó', 'é'],
    },
  },
  currencies: {
    USD: {
      symbol: '$',
      precision: 2,
    },
  },
};
