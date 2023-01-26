import httpProxy from 'http-proxy';
import { config } from './config.mjs';
import { log } from './log.mjs';

const commonProxyServerOptions = {
  changeOrigin: true,
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2', 'x-request-start'],
  redirectSameOrigin: true,
  httpProxyOptions: { xfwd: false },
  secure: false,
  rejectUnauthorized: false,
};

// THE MOVIE DATABASE

export const tmdbProxy = httpProxy.createProxyServer(commonProxyServerOptions);

tmdbProxy
  .on('proxyReq', (proxyReq, req) => {
    log.request('tmdb', req);
    proxyReq.setHeader('Authorization', `Bearer ${config.tmdb.token}`);
    proxyReq.setHeader('Content-Type', 'application/json;charset=utf-8');
    req.on('error', log.error);
  })
  .on('error', log.error);

// OPEN WEATHER MAP

export const owmProxy = httpProxy.createProxyServer(commonProxyServerOptions);

owmProxy
  .on('proxyReq', (proxyReq, req) => {
    // OWM needs the apikey in the url as a query param
    if (!/[?&]appid=/.test(proxyReq.path)) {
      const addChar = proxyReq.path.includes('?') ? '&' : '?';
      proxyReq.path += `${addChar}appid=${config.owm.token}`;
    }
    log.request('owm', req);
    proxyReq.setHeader('Content-Type', 'application/json;charset=utf-8');
    req.on('error', log.error);
  })
  .on('error', log.error);

// GITHUB

export const githubProxy = httpProxy.createProxyServer(commonProxyServerOptions);

githubProxy
  .on('proxyReq', (proxyReq, req) => {
    log.request('github', req);
    proxyReq.setHeader('Authorization', `Bearer ${config.github.token}`);
    proxyReq.setHeader('Accept', 'application/vnd.github+json');
    proxyReq.setHeader('Content-Type', 'application/json;charset=utf-8');
    proxyReq.setHeader('X-GitHub-Api-Version', '2022-11-28');
    req.on('error', log.error);
  })
  .on('error', log.error);

export const proxies = {
  tmdb: tmdbProxy,
  owm: owmProxy,
  github: githubProxy,
};
