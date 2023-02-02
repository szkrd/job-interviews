type TEnvironment = 'PROD' | 'DEV' | 'STAGE';

export function getBrowserEnvironment(): TEnvironment {
  // not very nice, but technically stage runs in non-dev (prod) mode
  let environment: TEnvironment = 'PROD';
  if (window.location.hostname === 'localhost') {
    environment = 'DEV';
  }
  // if (window.location.host.split('.')[0] === 'foobar-staging') {
  //   environment = 'STAGE';
  // }
  return environment;
}
