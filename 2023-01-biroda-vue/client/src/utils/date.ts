// equivalent of dayjs format with `MMM D, YYYY`
export function formatDate(date?: string) {
  if (!date) return '';
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][
    dateObj.getMonth()
  ];
  const day = dateObj.getDate();
  return `${month} ${day}, ${year}`;
}
