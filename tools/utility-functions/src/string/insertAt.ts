/** Inserts (or prepends/appends) text to a given position. */
export function insertAt(text: string, index: number, textToInsert: string): string {
  if (index > text.length) {
    return text + textToInsert;
  }
  if (index <= 0) {
    return textToInsert + text;
  }
  return text.substring(0, index) + textToInsert + text.substring(index, text.length);
}
