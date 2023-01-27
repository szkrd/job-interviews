import http from 'http';
import { config } from './src/config.mjs';
import { fetchHtml } from './src/fetchHtml.mjs';
import { returnHttpError } from './src/http.mjs';
import { log } from './src/log.mjs';
import { proxies } from './src/proxies.mjs';
import { queryString } from './src/utils/queryString.mjs';
import { validateToken } from './src/validators.mjs';

const { port, delay } = config;

log.info(`Listening on port ${port}, active proxies: ${config.activeProxies.join(', ')}.`);
http
  .createServer((req, res) => {
    const { url } = req;
    // fetch any resource using node fetch (requires node 17.5+)
    if (url.startsWith('/fetch')) {
      const query = queryString.parse(url.split('?')[1] || '');
      const targetUrl = query.url;
      const selectors = Array.isArray(query.selector) ? query.selector : [query.selector ?? 'html'];
      const as = query.as ?? 'html';
      fetchHtml(targetUrl, selectors, as);
      res.write('Feature work in progress.');
      res.end();
      return;
    }
    // api proxies
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
