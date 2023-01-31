/** Replace parts of a string at a given position. */
export function replaceAt(text: string, index: number, replacement: string): string {
  return text.substring(0, index) + replacement + text.substring(index + replacement.length);
}
