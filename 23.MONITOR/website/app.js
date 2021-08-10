// 服务端  koa框架

let Koa = require('koa');
let Server = require('koa-static');
let path = require("path");

let app = new Koa();

app.use(Server(path.join(__dirname, 'client')));
app.use(Server(path.join(__dirname, 'node_modules')));

app.use(async (ctx, next) => {
    if (ctx.path === '/api/list') {
        ctx.body = { name: 'xiaoming', age: 20 }
    } else {
        return next();
    }
});

app.listen(3000, function () {
    console.log("server start 3000");
});