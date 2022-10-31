const Store = require("electron-store");
const path = require("path");

const store = new Store();

class Settings {
  constructor() {
    this.userSettingsKeyKey = "user-settings";
    this.defaultSchema = {
      defaultDownloadsPath: "C:\\",
      lastTimeUpdated: new Date(),
      audioQuality: "128",
      filePrefix: "",
    };
  }

  getUserPreferences() {
    const storedPreferences = store.get(this.userSettingsKey);

    if (!storedPreferences) {
      store.set(this.userSettingsKey, this.defaultSchema);
    }

    return storedPreferences[this.userSettingsKeyKey];
  }

  saveSettings(changes) {
    console.log(changes);
    store.set(this.userSettingsKey, changes);
  }

  restoreDefault() {
    store.set(this.userSettingsKey, this.defaultSchema);
  }
}

module.exports = Settings;
