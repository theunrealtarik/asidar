const { ipcMain, dialog, BrowserWindow } = require("electron");
const { audioConverter } = require("asidar-lib");
const mt = require("ytdl-getinfo");
const Settings = require("./settings.js");

const settings = new Settings();

module.exports = function events(window = BrowserWindow) {
  console.log("- events have loaded");

  // settings
  ipcMain.handle("select-dir", async () => {
    const selectedDir = await dialog.showOpenDialog(window, {
      properties: ["openDirectory"],
    });

    return selectedDir;
  });

  ipcMain.handle("user-prefs", (event) => {
    return {
      user: settings.getUserPreferences(),
      defaultPrefs: settings.defaultSchema,
    };
  });

  ipcMain.handle("restore", () => settings.restoreDefault());
  ipcMain.handle("save", (event, userChanges) => {
    settings.saveSettings(userChanges);
  });

  // conversion
  let cachedTracks = [];

  ipcMain.handle("download", async (event, url) => {
    const _p = settings.getUserPreferences();
    if (!url) return;

    const metadata = (await mt.getInfo(url)).items[0];

    audioConverter(url, {
      outFilename: String(metadata.title).replace(
        /:|\?|\\|\/|\:|\*|<|>|\"|\|/g,
        ""
      ),
      outPath: _p.defaultDownloadsPath,
      filePrefix: _p.filePrefix,
      audioQuality: _p.audioQuality,
    }).then((proc) => {
      proc.on("end", () => {
        cachedTracks.push(metadata.display_id);
      });
    });
    return metadata;
  });

  ipcMain.handle("progress", (event, id) => {
    if (cachedTracks.includes(id)) return true;
    return false;
  });

  ipcMain.handle("clear", () => {
    cachedTracks = [];
  });
};
