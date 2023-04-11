"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
if (require("electron-squirrel-startup")) {
    electron_1.app.quit();
}
// main window
const createWindow = () => {
    const mainWindow = new electron_1.BrowserWindow({
        height: 480,
        width: 680,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });
    const downloading = new Set();
    // events
    electron_1.ipcMain.handle(constants_1.EVENTS.FFMPEG, () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utils_1.checkFFMPG)();
    }));
    electron_1.ipcMain.handle(constants_1.EVENTS.DOWNLOAD, (e, url, format) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ytdl_core_1.default.validateURL(url)) {
            electron_1.dialog.showErrorBox("Invalid URL", "The URL provided appears to be invalid for a YouTube video, suggesting that it may not be a valid web address for accessing a YouTube video. It could be expired, broken, or entered incorrectly.");
            return;
        }
        switch (format) {
            case "mp3":
                try {
                    const metadata = yield ytdl_core_1.default.getInfo(url);
                    utils_1.Converter.convertAudio(url, metadata).then((track) => {
                        track.on("progress", (chunk) => {
                            downloading.add(metadata.videoDetails.videoId);
                        });
                        track.on("end", () => {
                            downloading.delete(metadata.videoDetails.videoId);
                        });
                    });
                    return metadata.videoDetails;
                }
                catch (error) {
                    console.log(error.message);
                }
                break;
            default:
                break;
        }
    }));
    electron_1.ipcMain.handle(constants_1.EVENTS.PEEK, (e, id) => {
        return downloading.has(id);
    });
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    if (process.env.NODE_ENV !== "development") {
        mainWindow.removeMenu();
    }
};
electron_1.app.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    createWindow();
}));
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//# sourceMappingURL=index.js.map