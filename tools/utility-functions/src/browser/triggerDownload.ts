import { isIos } from './isIos';

type MimeTypes = 'application/pdf' | 'application/zip';

const triggerDownload = (
  responseData: BlobPart,
  filename: string,
  mimeType: MimeTypes = 'application/pdf',
  charset = 'utf-8'
) => {
  const type = isIos() ? mimeType : `${mimeType}; charset=${charset}`;
  const blob = new Blob([responseData], { type });
  const anyNavigator = window.navigator as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (typeof anyNavigator.msSaveBlob !== 'undefined') {
    anyNavigator.msSaveBlob(blob, filename);
    return;
  }
  const blobUrl = window.URL.createObjectURL(blob);
  if (isIos()) {
    window.location.href = blobUrl;
    return;
  }

  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobUrl;
  tempLink.setAttribute('download', filename);

  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);

  window.URL.revokeObjectURL(blobUrl);
};

export default triggerDownload;
