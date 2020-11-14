const Koa = require("koa");
const KoaStatic = require("koa-static");

const app = new Koa();

app.use(
  KoaStatic("dist/", {
    maxAge: 365 * 24 * 60 * 60 * 1000,
  })
);

app.get("/*", (req, res, next) => {
  // SPA: serve the main HTML file at ALL navigation URLs
  if (req.headers["accept"].indexOf("text/html") > -1) {
    res.sendFile(process.cwd() + "/build/index.html");
  } else {
    next();
  }
});
const server = app.listen(process.env.PORT || 3000);
