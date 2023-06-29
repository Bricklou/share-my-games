const path = require("path");

const config = (config, _options) => {
  config.module.rules.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: '@graphql-tools/webpack-loader',
  })

  config.resolve.alias = {
    "@": path.resolve(__dirname, "./src"),
    "@app": path.resolve(__dirname, "./src/app"),
  };

  return config;
};

module.exports = config;
