const Koa = require('koa')
const c2k = require('koa-connect')
const proxy = require('http-proxy-middleware')

const app = new Koa()

const cookie = 'L_USM=QVFrOHJTbTdrSnBiYTRKYVU9SkNTeDA3b1NzRllKb3NYUkc2VUFWPXJNY0hrS3M3VUJJWGgtWWdJTkk0a09HRFhPVi13NEoyVVNORGQtSjduTnQ5UFA0SDE%253D; PHPSESSID=e0870tcel0h8f6hna2l2ld6vi5'

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