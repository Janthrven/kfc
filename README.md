# kfc

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## token
前后端分离，使用token验证登录，识别当前用户是否保持着登录状态

前端使用一个正确的账号和密码跟服务器换取一个合法的token，服务器将token返回给前端，前端将token存在cookie或者是本地存储中，后面每次访问有关于用户信息的页面，都必须携带token到后台验证，如果验证通过则允许访问，否则直接拦截

## 开启后端
node F:\肯德基vue\kfc\server\app.js

注：项目拷贝在哪个盘，F:\\就更改为哪个盘

是自己写的数据，没有使用数据库，写了连接Mysql的接口，使用者可自行开发
