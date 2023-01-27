import { log } from './log.mjs';

function getCorsHeaders(mixin = {}) {
  return {
    'Access-Control-Allow-Origin': '*', // development only, of course
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    ...mixin,
  };
}

function respondWithJson(res, status = 200, data) {
  res.writeHead(status, getCorsHeaders({ 'Content-Type': 'application/json' }));
  res.write(JSON.stringify(data));
  res.end();
}

export function returnJson(res, data) {
  respondWithJson(res, 200, data);
}

export function returnHttpError(res, status = 500, error = 'Server error.') {
  log.error(error);
  respondWithJson(res, status, { status, error });
}

export function returnCorsOptionsResponse(res) {
  res.writeHead(204, getCorsHeaders());
  res.end();
}
