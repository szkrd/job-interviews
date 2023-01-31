/** Convert the first character of a string to uppercase. */
export function capitalize(string = '') {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}
