require('dotenv').config()
const https = require('http')
const chalk = require('chalk')
const httpProxy = require('http-proxy')

// PORT, TARGET, ACCESS_TOKEN, RESPONSE_TIME
const port = parseInt(process.env.PORT, 10) || 5050
const target = process.env.TARGET || 'https://api.themoviedb.org/'
const token = process.env.ACCESS_TOKEN
const responseTime = parseInt(process.env.RESPONSE_TIME, 10) || 0
if (!token || token.length < 128) {
  console.error('Invalid or missing ACCESS_TOKEN env var!')
  process.exit(1)
}

const printError = (err) => console.error(chalk.red('Proxy error:'), err instanceof Error ? err.message : err)
const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2', 'x-request-start'],
  redirectSameOrigin: true,
  httpProxyOptions: { xfwd: false },
  secure: false,
  rejectUnauthorized: false,
})
proxy
  .on('proxyReq', (proxyReq, req, res, options) => {
    console.info(chalk.cyan(req.method) + ' ' + chalk.gray(req.url))
    proxyReq.setHeader('Authorization', `Bearer ${token}`)
    proxyReq.setHeader('Content-Type', 'application/json;charset=utf-8')
    req.on('error', printError)
  })
  .on('error', printError)

console.info(chalk.green(`Proxy target is "${target}";\nlistening on port ${port}\n`))
https
  .createServer((req, res) => {
    const proxyWeb = () => proxy.web(req, res, { target })
    const caller = responseTime ? () => setTimeout(proxyWeb, responseTime) : proxyWeb;
    caller();
  })
  .listen(port)
