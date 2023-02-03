import { getCalendarDays } from './getCalendarDays';
import moment from 'moment';
import { Moment } from 'moment';

const getLeadingAndTrailingNulls = (arr: Moment[]): [number, number] => [
  arr.slice(0, 8).filter((item) => item === null).length,
  arr.slice(-8).filter((item) => item === null).length,
];

describe('getCalendarDays', () => {
  test('it returns nulls and dates for a given calendar page (month)', () => {
    let days = getCalendarDays(moment('2019-01-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([2, 2]);
    days = getCalendarDays(moment('2019-02-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([5, 2]);
    days = getCalendarDays(moment('2019-03-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([5, 6]);
    days = getCalendarDays(moment('2019-04-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([1, 4]);
    days = getCalendarDays(moment('2019-05-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([3, 1]);
    days = getCalendarDays(moment('2019-06-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([6, 6]);
    days = getCalendarDays(moment('2019-07-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([1, 3]);
    days = getCalendarDays(moment('2019-08-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([4, 0]);
    days = getCalendarDays(moment('2019-09-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([0, 5]);
    days = getCalendarDays(moment('2019-10-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([2, 2]);
    days = getCalendarDays(moment('2019-11-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([5, 0]);
    days = getCalendarDays(moment('2019-12-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([0, 4]);
  });
  test('takes into account the first day of the week', () => {
    const loc = moment.locale();
    moment.locale('hu');
    let days = getCalendarDays(moment('2019-01-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([1, 3]);
    days = getCalendarDays(moment('2019-02-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([4, 3]);
    days = getCalendarDays(moment('2019-03-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([4, 0]);
    days = getCalendarDays(moment('2019-04-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([0, 5]);
    days = getCalendarDays(moment('2019-05-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([2, 2]);
    days = getCalendarDays(moment('2019-06-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([5, 0]);
    days = getCalendarDays(moment('2019-07-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([0, 4]);
    days = getCalendarDays(moment('2019-08-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([3, 1]);
    days = getCalendarDays(moment('2019-09-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([6, 6]);
    days = getCalendarDays(moment('2019-10-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([1, 3]);
    days = getCalendarDays(moment('2019-11-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([4, 1]);
    days = getCalendarDays(moment('2019-12-01'));
    expect(getLeadingAndTrailingNulls(days)).toEqual([6, 5]);
    moment.locale(loc);
  });
});
