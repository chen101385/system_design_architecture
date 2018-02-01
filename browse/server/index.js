//required to use async functions in KOA
require('babel-core/register');

const Koa = require('koa'),
    Router = require('koa-router');

const app = new Koa(),
    router = new Router();

//koa body-parser middleware (converts req.body from JSON-to-code)
//ctx.request 
//ctx.response
app.use(require('koa-body')());

router.get("/", async (ctx, next) => {
  //ctx.body will be rendered as response;
  ctx.body = {message: "Hello World!"}
  next();
})

router.post("/", async (ctx, next) => {
    ctx.body = 
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('listening on port 3000'));

