const fs = require("fs");
const { build, Platform } = require("electron-builder");

console.time("⌚ - finished");

// include only important node_modules that the app requires
// in order to run properly
const requiredModules = ["bytenode"];
const node_modules = fs.readdirSync("node_modules");
const appFiles = node_modules.map((moduleName) => {
  if (!requiredModules.includes(moduleName)) {
    return "!" + "node_modules/" + moduleName + "/**/*";
  } else return "node_modules/" + moduleName;
});

appFiles.push(...["main.js", "build/**/*", "public/**/*", "lib/**/*"]);

build({
  targets: Platform.WINDOWS.createTarget(),
  config: {
    appId: "com.asidar.app",
    buildVersion: "1.0.0",
    productName: "asidar",
    extends: null,
    icon: "./assets/asidar.ico",
    target: "NSIS",
    asar: false,
    files: appFiles,
    nsis: {
      installerIcon: "./assets/asidar.ico"
    },
  },
}).then((result) => console.timeEnd("⌚ - finished"));
