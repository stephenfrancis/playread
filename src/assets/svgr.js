const Fs = require("fs");
const Svgr = require("@svgr/core").default;

const SOURCE_PATH = "src/assets/raw/";
const TARGET_PATH = "src/assets/react/";

console.log(typeof Svgr);

const formatComponentName = (path) => {
  const file_name = /\/?(.*)\.svg$/.exec(path);
  if (!file_name) {
    throw new Error(`invalid path: ${path}`);
  }
  return file_name[1]
    .split(/\W+/)
    .map((word) => {
      return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
    })
    .join("");
};

Fs.readdir(
  SOURCE_PATH,
  {
    encoding: "utf8",
  },
  (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((path) => {
      const component_name = formatComponentName(path);
      // console.log(`component_name: ${component_name}`);
      Fs.readFile(SOURCE_PATH + path, (err2, data) => {
        if (err2) {
          console.error(err2);
          return;
        }
        Svgr(
          data,
          {
            icon: true,
            typescript: true,
          },
          {
            componentName: component_name,
          }
        ).then((js_code) => {
          Fs.writeFile(
            TARGET_PATH + component_name + ".tsx",
            js_code,
            {
              encoding: "utf8",
            },
            (err3) => {
              console.error(err3);
            }
          );
        });
      });
    });
  }
);
