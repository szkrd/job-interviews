import { load as cheerioLoad } from 'cheerio';
import { log } from './log.mjs';

export function fetchHtml(url, selectors, as = 'html') {
  if (!['html', 'text'].includes(as)) throw new Error('Unknown target format.');
  if (url.startsWith('//')) url = 'http:' + url;
  if (!url.startsWith('http')) {
    url = 'https://' + url;
  }
  const fetchOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: { Accept: 'text/html' },
  };
  return new Promise((resolve, reject) => {
    fetch(url, fetchOptions)
      .then((resp) => resp.text())
      .then((resp) => {
        const html = resp.trim();
        const isHtml = html.startsWith('<!DOCTYPE');
        if (!isHtml) {
          log.warn(`Response has no html5 doctype? "${html.substring(0, 20)}"`);
        }
        const $ = cheerioLoad(html);
        const ret = {};
        selectors.forEach((sel) => {
          const nodes = $(sel);
          const results = (ret[sel] = []);
          nodes.each((idx, node) => {
            results.push($(node)[as]().trim());
          });
        });
        resolve(ret);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
