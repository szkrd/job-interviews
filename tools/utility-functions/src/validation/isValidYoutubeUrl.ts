export function isValidYoutubeUrl(url: string): boolean {
  const rex = /^(https:\/\/)(?:[\w]+\.)?youtube\.com\/?(?:c\/|channel\/|user\/)?([a-zA-Z0-9\-?=&]+)?/i;
  return rex.test(url);
}
