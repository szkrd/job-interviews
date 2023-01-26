import https from 'http';
import { config } from './src/config.mjs';
import { returnHttpError } from './src/http.mjs';
import { log } from './src/log.mjs';
import { owmProxy, tmdbProxy } from './src/proxies.mjs';
import { validateToken } from './src/validators.mjs';

const { port, delay } = config;

log.info(`Listening on port ${port}; mapping:\n/tmdb/ -> ${config.tmdb.apiUrl}`);
https
  .createServer((req, res) => {
    const proxyWeb = () => {
      if (req.url.startsWith(config.tmdb.prefix)) {
        const isTokenOk = validateToken.tmdb(config.tmdb.token);
        if (!isTokenOk) return returnHttpError(res, 400, 'Invalid or missing tmdb token.');
        req.url = req.url.replace(config.tmdb.prefix, '');
        return tmdbProxy.web(req, res, { target: config.tmdb.apiUrl });
      }
      if (req.url.startsWith(config.owm.prefix)) {
        const isTokenOk = validateToken.owm(config.owm.token);
        if (!isTokenOk) return returnHttpError(res, 400, 'Invalid or missing owm token.');
        req.url = req.url.replace(config.owm.prefix, '');
        return owmProxy.web(req, res, { target: config.owm.apiUrl });
      }
      returnHttpError(res, 404, 'Uknown prefix or invalid url.');
    };
    const caller = delay ? () => setTimeout(proxyWeb, delay) : proxyWeb;
    caller();
  })
  .listen(port);
