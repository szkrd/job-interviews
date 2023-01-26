import https from 'http';
import { config } from './src/config.mjs';
import { returnHttpError } from './src/http.mjs';
import { log } from './src/log.mjs';
import { proxies } from './src/proxies.mjs';
import { validateToken } from './src/validators.mjs';

const { port, delay } = config;

log.info(`Listening on port ${port}, active proxies: ${config.activeProxies.join(', ')}.`);
https
  .createServer((req, res) => {
    const proxyWeb = () => {
      for (let idx = 0; idx < config.activeProxies.length; idx++) {
        const name = config.activeProxies[idx];

        const activeCfg = config[name];
        const activePrx = proxies[name];
        if (!activeCfg || !activePrx) {
          return returnHttpError(res, 500, 'Invalid active proxy name in ACTIVE_PROXIES?');
        }

        const validator = validateToken[activeCfg];
        if (req.url.startsWith(activeCfg.prefix)) {
          const isTokenOk = validator ? validator(config.tmdb.token) : true;
          if (!isTokenOk) return returnHttpError(res, 400, `Invalid or missing ${name} token.`);
          req.url = req.url.replace(activeCfg.prefix, '');
          return activePrx.web(req, res, { target: activeCfg.apiUrl });
        }
      }
      returnHttpError(res, 404, 'Uknown prefix or invalid url.');
    };
    const caller = delay ? () => setTimeout(proxyWeb, delay) : proxyWeb;
    caller();
  })
  .listen(port);
