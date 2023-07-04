const path = require("path");

const config = (config, _options) => {
  let rules = config.module.rules || [];
  rules = rules.filter((r) => r.test && "style.css".match(r.test));

  // https://github.com/angular/angular-cli/blob/main/packages/angular_devkit/build_angular/src/tools/webpack/configs/styles.ts
  rules.forEach(function (_, index, rulesArr) {
    rulesArr[index].rules[0]?.oneOf.forEach(function (_, index, arr) {
      arr[index].use.forEach(function (_, index, arr) {
        if (!arr[index].loader.includes("postcss-loader")) {
          return;
        }

        const oldOptionsFn = arr[index].options.postcssOptions;
        arr[index].options.postcssOptions = (loader) => {
          const oldOptions = oldOptionsFn(loader);

          return {
            ...oldOptions,
            plugins: [
              "postcss-import",
              "tailwindcss/nesting",
              ...oldOptions.plugins,
              "cssnano",
            ],
          };
        };
      });
    });
  });

  config.module.rules.push({
    test: /\.(?:graphql|gql)$/,
    exclude: /node_modules/,
    loader: "@graphql-tools/webpack-loader",
  });

  config.resolve.alias = {
    "@": path.resolve(__dirname, "./src"),
    "@app": path.resolve(__dirname, "./src/app"),
  };

  return config;
};

module.exports = config;
