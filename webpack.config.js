const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "src/server.ts"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: ["/node_modules/", "/database/"],
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx"],
  },
  target: "node", //http://community.openfl.org/t/target-node/9973
  externals: {
    knex: "commonjs knex", //https://github.com/tgriesser/knex/issues/1128#issuecomment-312735118
    express: "commonjs express",
  },
};
