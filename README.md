# 智慧路灯

## 安装

```html
npm install
```

## 开发

```html
npm start
```

因为域名原因 需要手动填写 cookie 到 cookie.js 中，以保证开发模式下带有身份信息。
开发模式中会在 5001 端口启动一个本地服务器代理请求到线上地址。

## 打包部署

```html
npm run build
```

生成的 `build` 文件夹需要通过 `scp` 部署到远程服务器

```html
scp -r [本地文件夹] root@39.106.114.35:/usr/work/tool/webroot/light

```
