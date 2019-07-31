const Koa = require('koa')
const c2k = require('koa-connect')
const proxy = require('http-proxy-middleware')

const app = new Koa()

const cookie = 'PHPSESSID=mf1v8bma8k1giur70cm3mq32g5; L_USM=d3hhYlp0WTdGPUlKMXFKN0tlM2hFeFZ4SEFIM1lxZUxGczQ2MTIwdDE3OXNScWFtQkRxMTNBenFTYk9IRnNJcjZCcHN6d0liWWFMR1ZCcHRFQldmWnQ9ako%253D'

app.use(
  c2k(
    proxy('/smart_site', {
      target: 'http://39.106.114.35/smart_site',
      changeOrigin: true,
      pathRewrite: {
        '^/smart_site': '/'
      },
      logLevel: 'silent',
      onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('cookie', cookie)
      }
    })
  )
)

app.listen(5001, () => {
  console.log('listen on 5001')
})