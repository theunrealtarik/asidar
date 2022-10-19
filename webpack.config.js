const path = require("path");
const webpack = require("webpack");
const NodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    app: "./app/src/index.js",
  },
  mode: "production",
  target: "node",
  externals: [NodeExternals()],
  externalsPresets: {
    node: true,
  },
  output: {
    path: path.resolve(__dirname, "app", "dist"),
    filename: "[name].min.js",
  },
  plugins: [],
};