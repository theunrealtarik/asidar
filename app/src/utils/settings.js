const Store = require("electron-store");
const path = require("path");

const store = new Store();
const USER_SETTINGS_KEY = "user-settings";
class Settings {
  constructor() {
    this.defaultSchema = {
      defaultDownloadsPath: "C:\\",
      audioQuality: "128",
      filePrefix: "",
    };
  }

  getUserPreferences() {
    const storedPreferences = store.get(USER_SETTINGS_KEY);
    if (!storedPreferences) {
      store.set(this.userSettingsKey, this.defaultSchema);
    }

    return storedPreferences;
  }

  saveSettings(changes) {
    store.set(USER_SETTINGS_KEY, changes);
  }

  restoreDefault() {
    store.set(this.userSettingsKey, this.defaultSchema);
  }
}

module.exports = Settings;
