import moment from 'moment';
import { Moment } from 'moment';

export const DATE_FORMAT_PRECISE = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT_SHORT_SWITCHABLE = ['YYYY MMM D.', 'MMM D.'];

/**
 * returns the short date without the year part
 * if the current year equals the given one
 */
const getSwitchableShortDate = (date: string | Moment | Date): string => {
  const currentYear = new Date().getFullYear();
  const valueYear = moment(date).year();
  const format = DATE_FORMAT_SHORT_SWITCHABLE[+(valueYear === currentYear)];

  return moment(date).format(format).toUpperCase();
};

export default getSwitchableShortDate;
