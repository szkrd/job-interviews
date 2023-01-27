import chalk from 'chalk';

function info(message) {
  console.info(chalk.green(message));
}

function warn(message) {
  console.info(chalk.yellow(message));
}

function error(err, details) {
  console.error(chalk.red('Proxy error:'), err instanceof Error ? err.message : err);
  if (details) console.error(details); // let node set the colors
}

function request(prefix = '', req) {
  console.info(chalk.magenta(prefix) + ' ' + chalk.cyan(req.method) + ' ' + chalk.gray(req.url));
}

export const log = {
  info,
  warn,
  error,
  request,
};
