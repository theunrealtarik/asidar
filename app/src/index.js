const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const url = require("url");
const events = require("./utils/events");

console.log("- mode: ", process.env.MODE);

app.whenReady().then(() => {
  main();
  app.on("activate", () => {
    const allOpenedWindows = BrowserWindow.getAllWindows().length;
    if (allOpenedWindows == 0) main();
  });
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") app.quit();
});

function main() {
  const buildPath = path.join(__dirname, "../build", "index.html");
  const mainWindow = new BrowserWindow({
    height: 480,
    width: 680,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, "../assets", "asidar.ico"),
  });

  events(mainWindow);

  mainWindow.on("closed", () => mainWindow == null);
  if (typeof process.env.MODE != "undefined") {
    mainWindow.loadURL("http://localhost:3000/").then(() => {
      mainWindow.webContents.openDevTools({
        mode: "detach",
      });
    });
  } else {
    console.log("- production build test");

    mainWindow.removeMenu();
    mainWindow.loadURL(
      url.format({
        protocol: "file",
        pathname: buildPath,
        slashes: true,
      })
    );
  }
}
