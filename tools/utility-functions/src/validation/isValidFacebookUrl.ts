export function isValidFacebookUrl(url: string): boolean {
  // from backend
  const rex =
    /^(https:\/\/)(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/?(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/i;
  return rex.test(url);
}
