import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./configs/webpack.main.config";
import { rendererConfig } from "./configs/webpack.renderer.config";

const config: ForgeConfig = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: "deefault-src 'self'",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./public/index.html",
            js: "./core/renderer.tsx",
            name: "main_window",
            preload: {
              js: "./core/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
