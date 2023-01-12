import React, { FC } from 'react';

interface IDateFormat {
  prefix?: string;
  date: string;
}

const DateFormat: FC<IDateFormat> = ({ prefix = 'Opened', date }) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ][dateObj.getMonth()];
  const day = dateObj.getDate();
  return (
    <span>
      {prefix} {month} {day}, {year}
    </span>
  );
};

export default DateFormat;
