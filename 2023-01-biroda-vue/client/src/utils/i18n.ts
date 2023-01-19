/**
 * Naive humanize (splits camelCase into words, like userName = "user name")
 * @param text
 */
export function humanize(text: string) {
  return text.replace(/([A-Z])/g, ' $1').toLocaleLowerCase();
}
