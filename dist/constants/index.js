"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YouTubeURL = exports.EVENTS = void 0;
var EVENTS;
(function (EVENTS) {
    EVENTS["FFMPEG"] = "ffmpeg";
    EVENTS["PEEK"] = "peek";
    EVENTS["DOWNLOAD"] = "download";
    EVENTS["DOWNLOAD_VIDEO"] = "download-video";
})(EVENTS = exports.EVENTS || (exports.EVENTS = {}));
exports.YouTubeURL = new RegExp(/(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})/g);
//# sourceMappingURL=index.js.map