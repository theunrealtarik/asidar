const fs = require("fs");
const { build, Platform } = require("electron-builder");

console.time("⌚ - finished");

// include only important node_modules that the app requires
// in order to run properly
const packages = require("./package.json");
const modules = fs.readdirSync("./node_modules");

const us = Object.keys(packages.dependencies);

const appFiles = [
  ...modules.map((module) => {
    if (us.includes(module)) return "node_module/" + module;
    else return "!node_module/" + module + "/**/*";
  }),
];

appFiles.push(...["main.js", "build/**/*", "public/**/*", "lib/**/*"]);
build({
  targets: Platform.WINDOWS.createTarget(),
  config: {
    appId: "com." + packages.name + ".app",
    productName: packages.name,
    buildVersion: packages.version,
    extends: null,
    icon: "./assets/asidar.ico",
    target: "NSIS",
    asar: false,
    files: appFiles,
    nsis: {
      runAfterFinish: false,
      installerIcon: "./assets/asidar.ico",
    },
  },
}).then((result) => console.timeEnd("⌚ - finished"));
