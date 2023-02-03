/** Checks if a string looks like an opaque hex color (#fff, #f0f0f0). */
export function isHexColor(text: unknown): boolean {
  return typeof text === 'string' && /^#[0-9a-f]{3,6}$/i.test(text) && (text.length === 4 || text.length === 7);
}
