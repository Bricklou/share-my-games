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

  config.resolve.alias = {
    "@": path.resolve(__dirname, "./src"),
    "@app": path.resolve(__dirname, "./src/app"),
  };

  return config;
};

module.exports = config;
