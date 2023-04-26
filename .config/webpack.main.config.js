/* eslint @typescript-eslint/no-var-requires: "off" */
const plugins = require("./webpack.main.plugins");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main.ts",
  // Put your normal webpack config below here

  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },

  plugins: plugins,
};
