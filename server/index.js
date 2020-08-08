require('dotenv').config()
const https = require('http')
const chalk = require('chalk')
const httpProxy = require('http-proxy')
const target = process.env.TARGET || 'https://api.themoviedb.org/'
const token = process.env.ACCESS_TOKEN
if (!token || token.length < 128) {
  console.error('Invalid or missing ACCESS_TOKEN env var!')
  process.exit(1)
}

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2', 'x-request-start'],
  redirectSameOrigin: true,
  httpProxyOptions: { xfwd: false },
  secure: false,
  rejectUnauthorized: false,
})
proxy.on('proxyReq', (proxyReq, req, res, options) => {
  console.info(req.method + ' ' + chalk.gray(req.url))
  proxyReq.setHeader('Authorization', `Bearer ${token}`)
  proxyReq.setHeader('Content-Type', 'application/json;charset=utf-8')
  req.on('error', (err) => console.error(err))
})

const server = https.createServer((req, res) => {
  proxy.web(req, res, { target })
})

const port = parseInt(process.env.PORT, 10) || 5050
console.info(`Proxy target is "${target}";\nlistening on port ${port}`)
server.listen(port)
