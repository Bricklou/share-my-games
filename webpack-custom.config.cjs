const path = require("path");
const nodeExternals = require("webpack-node-externals");

const config = (config, _options, targetOptions) => {
  /*  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, './postcss.config.js')
          }
        }
      }
    ]
  }*/

  const out = config.module.rules.filter(
    (item) =>
      item.test.test("style.css") ||
      item.test.test("style.scss") ||
      item.test.test("style.sass") ||
      item.test.test("style.less") ||
      item.test.test("style.styl")
  );

  out.forEach(function (_, index, arr) {
    arr[index].rules.forEach(function (_, index2, arr2) {
      const useList = [];
      if (arr2[index2].oneOf) {
        arr2[index2].oneOf.forEach(function (_, index3, arr3) {
          useList.push(...arr3[index3].use);
        });
      }

      if (arr2[index2].use) {
        useList.push(...arr2[index2].use);
      }

      useList.forEach(function (_, index3, arr3) {
        if (arr3[index3].loader.includes("postcss")) {
          if (arr3[index3].options?.postcssOptions) {
            arr3[index3].options.postcssOptions.config = path.resolve(
              __dirname,
              "./postcss.config.cjs"
            );
          }
        }
      });
    });
  });

  config.resolve.alias = {
    "@": path.resolve(__dirname, "./src"),
    "@app": path.resolve(__dirname, "./src/app"),
  };

  // Running with SSR
  if (targetOptions.target === "server") {
    config.resolve?.extensions?.push(".mjs", ".graphql", ".gql");

    config.module?.rules?.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    config.externalsPresets = { node: true };

    config.externals.push(
      nodeExternals({
        allowlist: [/^(?!(livereload|concurrently|fsevents)).*/],
      })
    );

    config.plugins?.push(
      new IgnorePlugin({
        checkResource: (resource) => {
          const lazyImports = [
            "@nestjs/microservices",
            "@nestjs/microservices/microservices-module",
            "@nestjs/websockets/socket-module",
            "cache-manager",
            "class-validator",
            "class-transform",
          ];

          if (!lazyImpots.includes(resource)) {
            return false;
          }

          try {
            require.resolve(resource);
          } catch (_err) {
            return true;
          }
          return false;
        },
      })
    );
  }

  return config;
};

module.exports = config;
