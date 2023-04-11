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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
// See the Electron documentation for details on how to use preload scripts:
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("api", {
    request: (url, format) => __awaiter(void 0, void 0, void 0, function* () { return yield ipcRenderer.invoke(constants_1.EVENTS.DOWNLOAD, url, format); }),
    peek: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield ipcRenderer.invoke(constants_1.EVENTS.PEEK, id); }),
    isFfmpegInstalled: () => __awaiter(void 0, void 0, void 0, function* () { return yield ipcRenderer.invoke(constants_1.EVENTS.FFMPEG); }),
});
console.log("✅ preload.ts");
//# sourceMappingURL=preload.js.map