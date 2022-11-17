const Store = require("electron-store");
const path = require("path");

const store = new Store();
class Settings {
  constructor() {
    this.USER_SETTINGS_KEY = "user-settings";
    this.storedPreferences = store.get(this.USER_SETTINGS_KEY);
    this.defaultSchema = {
      defaultDownloadsPath: "C:\\",
      audioQuality: "128",
      filePrefix: "",
    };

    if (!this.storedPreferences) {
      store.set(this.USER_SETTINGS_KEY, this.defaultSchema);
    }
  }

  saveSettings(changes) {
    store.set(this.USER_SETTINGS_KEY, changes);
  }

  restoreDefault() {
    store.set(this.USER_SETTINGS_KEY, this.defaultSchema);
  }
}

module.exports = Settings;
