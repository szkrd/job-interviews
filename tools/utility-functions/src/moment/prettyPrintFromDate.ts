/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* [not working] */
import moment from 'moment';

type TFuzzyDate = string | Date | number | moment.Moment;

interface ILocale {
  labelResourceUrl: string;
  thousandSeparator: string;
  decimalSeparator: string;
  currencyFormat: string;
  shortPrettyFromDate: string[];
}

function getLocaleMeta(lang?: string): ILocale {
  return {} as any; // localeMeta.locales[lang || getCurrentLang()];
}

export function prettyPrintFromDate(date: TFuzzyDate, from?: TFuzzyDate, smallScreen?: boolean) {
  const momDate = moment(date);
  const momFrom = moment(from || new Date());

  if (!smallScreen) {
    return momDate.from(momFrom);
  }

  // minified from date is quite another kettle of fish (#1551)
  //
  // desired output:
  // 59s - 1m - 59m - 1h - 23h - 1d - 6d - 1w - 4w - 1mo - 11mo - 1y
  const rawDate = +momDate.toDate();
  const rawFrom = +momFrom.toDate();
  const { shortPrettyFromDate } = getLocaleMeta();
  const symbol = {
    second: shortPrettyFromDate[0],
    minute: shortPrettyFromDate[1],
    hour: shortPrettyFromDate[2],
    day: shortPrettyFromDate[3],
    week: shortPrettyFromDate[4],
    month: shortPrettyFromDate[5],
    year: shortPrettyFromDate[6],
  };

  const seconds = Math.round((rawFrom - rawDate) / 1000);
  if (seconds < 60) {
    return `${seconds}${symbol.second}`;
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}${symbol.minute}`;
  }
  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours}${symbol.hour}`;
  }
  const days = Math.round(hours / 24);
  if (days < 7) {
    return `${days}${symbol.day}`;
  }
  const weeks = Math.round(days / 7);
  const months = Math.round(momFrom.diff(momDate, 'months', true));
  if (weeks < 5 || months < 1) {
    return `${weeks}${symbol.week}`;
  }
  const years = Math.round(momFrom.diff(momDate, 'years', true));
  if (months < 12 || years < 1) {
    return `${months}${symbol.month}`;
  }
  return `${years}${symbol.year}`;
}
