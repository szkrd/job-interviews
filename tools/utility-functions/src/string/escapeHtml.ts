/** Escapes html special characters that would cause problems with innerHTML. */
export const escapeHtml = (text: string) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};
