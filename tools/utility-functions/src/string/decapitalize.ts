/** Convert the first character of a string to lowercase. */
export function decapitalize(string = '') {
  return string.charAt(0).toLocaleLowerCase() + string.slice(1);
}
