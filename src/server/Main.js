const Koa = require("koa");
const KoaStatic = require("koa-static");

const app = new Koa();

app.use(
  KoaStatic("dist/", {
    maxAge: 365 * 24 * 60 * 60 * 1000,
  })
);

const server = app.listen(process.env.PORT || 3000);
