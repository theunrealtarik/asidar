const Store = require("electron-store");
const { DEFAULT_DL_PATH } = require("./converter");

const store = new Store();
const userSettings = "user-settings";

const defaultSchema = {
  defaultDownloadsPath: DEFAULT_DL_PATH,
  lastTimeUpdated: new Date(),
  audioQuality: "128",
  filePrefix: ""
};

function getUserPreferences() {
  const storedPreferences = store.get(userSettings);

  if (!storedPreferences) {
    store.set(userSettings, defaultSchema);
  }

  return storedPreferences;
}

function saveSettings(changes) {
  console.log(changes);
  store.set(userSettings, changes);
}

function restoreDefault() {
  store.set(userSettings, defaultSchema);
}

module.exports = {
  saveSettings,
  restoreDefault,
  getUserPreferences,
  defaultSchema,
};
