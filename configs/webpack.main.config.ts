import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  entry: "./core/index.ts",
  module: {
    rules,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
