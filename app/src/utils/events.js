const { ipcMain, dialog, BrowserWindow } = require("electron");
const {
  defaultSchema,
  restoreDefault,
  saveSettings,
  getUserPreferences,
} = require("./settings.js");

module.exports = function events(window) {
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
      user: getUserPreferences(),
      defaultPrefs: defaultSchema,
    };
  });

  ipcMain.handle("restore", () => restoreDefault);
  ipcMain.handle("save", (event, userChanges) => {
    saveSettings(userChanges);
  });

  // conversion
};
