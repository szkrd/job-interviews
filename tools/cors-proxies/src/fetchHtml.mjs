import * as cheerio from 'cheerio';
import { log } from './log.mjs';

function getNodeData($, node, deep = false) {
  return {
    name: node.name,
    type: node.type,
    attribs: node.attribs,
    innerText: $(node).text().trim(),
    childCount: (node.children || []).length,
    children: deep ? (node.children || []).map((el) => getNodeData($, el, deep)) : undefined,
  };
}

export function fetchHtml(url, selectors, as = 'html') {
  if (!['html', 'text', 'outerHtml', 'node', 'nodeDeep'].includes(as)) throw new Error('Unknown target format.');
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
        const $ = cheerio.load(html);
        const ret = {};
        selectors.forEach((sel) => {
          const nodes = $(sel);
          const results = (ret[sel] = []);
          nodes.each((idx, node) => {
            let value;
            if (as === 'outerHtml') {
              value = $.html(node);
            } else if (as === 'node') {
              value = getNodeData($, node);
            } else if (as === 'nodeDeep') {
              value = getNodeData($, node, true);
            } else {
              value = $(node)[as]().trim(); // html and text
            }
            results.push(value);
          });
        });
        resolve(ret);
      })
      .catch((err) => {
        log.error('Fetch/cheerio error!', err);
        reject(err);
      });
  });
}
