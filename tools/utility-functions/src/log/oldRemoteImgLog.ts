/* eslint-disable @typescript-eslint/no-explicit-any */
/* [not working] */

// import { REMOTE_DEBUG_URL, IS_PRODUCTION } from '../../config'

const REMOTE_DEBUG_URL = '';
const IS_PRODUCTION = false;

const MAX_GET_REQUEST_SIZE = 80000;

const stringify = (v: any) => {
  const cache = new WeakSet();
  return JSON.stringify(v, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return;
      }
      cache.add(value);
    }
    return value;
  });
};

/**
 * Image element based minimal remote logger.
 */
export function remoteLog(...args) {
  if (IS_PRODUCTION) {
    return;
  }
  const img = new Image();
  const uid = Date.now() + '' + Math.random();
  let payload = encodeURIComponent(stringify(args));
  if (payload.length > MAX_GET_REQUEST_SIZE) {
    payload = encodeURIComponent(
      stringify(args.map((val) => (typeof val === 'object' && val !== null ? { skipped: 'object too large' } : val)))
    );
  }
  img.src = `${REMOTE_DEBUG_URL}/${uid}.png?p=${payload}`;
}

// THE "BACKEND":
/*
```
const chalk = require('chalk')
const crypto = require('crypto')
const http = require('http')

const withColors = !!process.argv.find(s => s === '--color')
const noJSON = !!process.argv.find(s => s === '--no-json')
const doFormatJSON = !!process.argv.find(s => s === '--format-json')
const noObjects = !!process.argv.find(s => s === '--no-objects')

const port = process.env.DEBUG_LISTENER_PORT || 7070
const px = 'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=' // a black pixel
const getSig = data => crypto.createHash('sha1').update(data).digest('hex').substr(-6)
const getDate = () => new Date().toJSON().slice(0, 19).replace('T', ' ')

// logs to the console anything after the ?p= param,
// if it's a json string, then optionally reformats it;
// (if you want to log to a file, use std out redirection `> log.txt`
// without colors of course)
// ## example
// - url `http://localhost:7070/debug.png?p=mary%20had%20a%20little%20lamb`
// - logs "[2018-11-26 12:37:39 c618f5]: mary had a little lamb"
const server = http.createServer('*', (req, res) => {
  const sig = getSig(req.headers['user-agent'] || '')
  let jsobj
  let param = req.url.replace(/^.*?\?p=/, '')
  try { param = decodeURIComponent(param) } catch (e) {}
  try { jsobj = JSON.parse(param) } catch (e) {}
  if (noObjects && !noJSON && jsobj) {
    jsobj = jsobj.filter(val => typeof val !== 'object' || val === null)
  }
  let prefix = `[${getDate()} ${sig}]:`
  prefix = withColors ? chalk.whiteBright(prefix) : prefix
  let valueToLog = jsobj ? JSON.stringify(jsobj, null, doFormatJSON ? 2 : 0) : param
  valueToLog = noJSON ? param : valueToLog
  if (withColors) {
    const colorChars = [ '📹', '♻', '🖥',  '🔌' ] // non ascii chars should not be used as obj keys
    const colorNames = [ 'green', 'red', 'blue', 'magenta' ]
    colorChars.forEach(chr =>
      valueToLog = valueToLog.includes(chr) ? chalk[colorNames[colorChars.indexOf(chr)]](valueToLog) : valueToLog)
  }
  console.log(prefix, valueToLog)
  const img = Buffer.from(px, 'base64')
  res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': img.length })
  res.end(img)
})

server.listen(port, () => {
  console.log(
    `Listening on port ${port}!\n` +
    'Start webpack with "' + chalk.cyan('yarn start:remotedebug') + '" for the default port and host.\n'
  )
})
```
*/
