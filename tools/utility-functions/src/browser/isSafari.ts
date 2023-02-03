export const isSafari = (): boolean => {
  const userAgent = navigator.userAgent.toLocaleLowerCase();
  return userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1;
};
