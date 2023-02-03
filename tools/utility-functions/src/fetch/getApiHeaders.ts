/**
 * Get accept and content type (header data) for json or pdf.
 */
export const getApiHeaders = (token?: string, blob = false): Partial<HeadersInit> => {
  const blobHeader: HeadersInit = {
    Accept: 'application/pdf',
    'Content-Type': 'application/pdf',
  };
  const jsonHeader: HeadersInit = {
    Accept: 'application/json, text/plain',
    'Content-Type': 'application/json',
  };
  let headers: HeadersInit = blob ? blobHeader : jsonHeader;
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  // should we need the language:
  // headers['Accept-Language'] = take.from.store || '*';
  return headers;
};
