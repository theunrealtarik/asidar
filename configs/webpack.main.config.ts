import type { Configuration } from "webpack";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  entry: "./core/index.ts",
  module: {
    rules,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },
};
