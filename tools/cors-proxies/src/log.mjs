import chalk from 'chalk';

function info(message) {
  console.info(chalk.green(message));
}

function error(err) {
  console.error(chalk.red('Proxy error:'), err instanceof Error ? err.message : err);
}

function request(req) {
  console.info(chalk.cyan(req.method) + ' ' + chalk.gray(req.url));
}

export const log = {
  info,
  error,
  request,
};
