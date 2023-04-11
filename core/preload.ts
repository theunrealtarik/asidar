import { EVENTS } from "../constants";

// See the Electron documentation for details on how to use preload scripts:
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  request: async (url: string, audioQuality: AudioQuality) =>
    await ipcRenderer.invoke(EVENTS.DOWNLOAD, url, audioQuality),
  peek: async (id: string, audioQuality: AudioQuality) =>
    await ipcRenderer.invoke(EVENTS.PEEK, id, audioQuality),
  isFfmpegInstalled: async () => await ipcRenderer.invoke(EVENTS.FFMPEG),
});
console.log("✅ preload.ts");
