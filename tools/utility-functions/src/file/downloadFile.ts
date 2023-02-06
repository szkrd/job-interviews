const BOM = '\ufeff';

/**
 * Trigger browser download for js string using a temporary
 * HTML link element and setting its href to blob data.
 * Old (pre 2018) safari fixes has been removed.
 * @see https://github.com/kennethjiang/js-file-download
 */
export function downloadFile(fileName: string, data: string, mimeType = 'application/octet-stream') {
  if (!data.endsWith('\n')) data += '\n';
  data = data.startsWith(BOM) ? data : BOM + data;
  const blob = new Blob([data], { type: mimeType });
  const blobURL = window.URL.createObjectURL(blob);
  const linkEl = document.createElement('a');
  linkEl.style.display = 'none';
  linkEl.setAttribute('href', blobURL);
  linkEl.setAttribute('download', fileName);
  document.body.appendChild(linkEl);
  linkEl.click();
  setTimeout(() => {
    document.body.removeChild(linkEl);
    window.URL.revokeObjectURL(blobURL);
  }, 200);
}
