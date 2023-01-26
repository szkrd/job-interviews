import https from 'http';
import httpProxy from 'http-proxy';
import { config } from './src/config.mjs';
import { returnHttpError } from './src/http.mjs';
import { log } from './src/log.mjs';
import { validateToken } from './src/validators.mjs';

const { port, delay } = config;

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2', 'x-request-start'],
  redirectSameOrigin: true,
  httpProxyOptions: { xfwd: false },
  secure: false,
  rejectUnauthorized: false,
});
proxy
  .on('proxyReq', (proxyReq, req) => {
    log.request(req);
    proxyReq.setHeader('Authorization', `Bearer ${config.tmdb.token}`);
    proxyReq.setHeader('Content-Type', 'application/json;charset=utf-8');
    req.on('error', log.error);
  })
  .on('error', log.error);

log.info(`Listening on port ${port}; mapping:\n/tmdb/ -> ${config.tmdb.apiUrl}`);
https
  .createServer((req, res) => {
    const proxyWeb = () => {
      if (req.url.startsWith(config.tmdb.prefix)) {
        const isTokenOk = validateToken.tmdb(config.tmdb.token);
        if (!isTokenOk) return returnHttpError(res, 400, 'Invalid or missing token.');
        req.url = req.url.replace(config.tmdb.prefix, '');
        return proxy.web(req, res, { target: config.tmdb.apiUrl });
      }
      returnHttpError(res, 404, 'Uknown prefix or invalid url.');
    };
    const caller = delay ? () => setTimeout(proxyWeb, delay) : proxyWeb;
    caller();
  })
  .listen(port);
