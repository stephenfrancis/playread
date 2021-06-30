import { fusebox } from "fuse-box";
import * as path from "path";

const env = process.env.NODE_ENV;
const workspace = path.join(__dirname, "../..");

if (["development", "production"].indexOf(env) === -1) {
  throw new Error(
    `unrecognized NODE_ENV: ${env} (should be 'development' or 'production')`
  );
}

const fuse = fusebox({
  entry: "../app/App.tsx",
  target: "browser",
  devServer: env === "development",
  webIndex: {
    template: "../public/index.html",
  },
  watcher: {
    root: workspace, // watch parent folder
  },
});

if (env === "development") {
  fuse.runDev({
    bundles: {
      distRoot: "../../dist",
    },
  });
} else {
  fuse.runProd({
    bundles: {
      distRoot: "../../dist",
    },
  });
}
