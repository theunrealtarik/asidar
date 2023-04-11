import { app, BrowserWindow, dialog, ipcMain } from "electron";
import ytdl from "ytdl-core";

import { ERROR_MESSAGES, EVENTS, YouTubeURL } from "../constants";
import { Converter, checkFFMPG } from "../utils";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

// main window
const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 480,
    width: 680,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  const downloaded = new Set<string>();

  // events
  ipcMain.handle(EVENTS.FFMPEG, async () => {
    return checkFFMPG();
  });

  ipcMain.handle(
    EVENTS.DOWNLOAD,
    async (e, url: string, audioQuality: AudioQuality) => {
      if (!ytdl.validateURL(url)) {
        dialog.showErrorBox("Invalid URL", ERROR_MESSAGES.invalidURL);
        return;
      }

      try {
        const metadata = await ytdl.getInfo(url);
        Converter.convertAudio(url, metadata, audioQuality).then((track) => {
          track.on("end", () => {
            downloaded.add(`${audioQuality}_${metadata.videoDetails.videoId}`);
          });
        });

        return metadata.videoDetails;
      } catch (error) {
        console.log((error as Error).message);
      }
    }
  );

  ipcMain.handle(
    EVENTS.PEEK,
    (e, videoId: string, audioQuality: AudioQuality) => {
      console.log(downloaded);
      return downloaded.has(`${audioQuality}_${videoId}`);
    }
  );

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (process.env.NODE_ENV !== "development") {
    mainWindow.removeMenu();
  }
};

app.on("ready", async () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
