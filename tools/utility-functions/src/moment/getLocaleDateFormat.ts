import moment from 'moment';
import { uniq } from '../array/uniq';

export const getLocaleDateFormat = (locale: string): string[] =>
  uniq<string>(moment().locale(locale).localeData().longDateFormat('L').toUpperCase().replace(/\W/g, '').split(''));
