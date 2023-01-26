import { log } from './log.mjs';

export function returnHttpError(res, status = 500, error = 'Server error.') {
  log.error(error);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ status, error }));
  res.end();
}
