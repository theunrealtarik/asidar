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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFFMPG = exports.Converter = exports.AUDIO_DEFAULT_OUTPUT_PATH = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const path_1 = __importDefault(require("path"));
const child_process_1 = __importDefault(require("child_process"));
exports.AUDIO_DEFAULT_OUTPUT_PATH = path_1.default.join(process.env.HOMEDRIVE, process.env.HOMEPATH, "Music");
class Converter {
}
exports.Converter = Converter;
_a = Converter;
Converter.convertAudio = (url, info) => __awaiter(void 0, void 0, void 0, function* () {
    const NON_ALLOWED_CHARS = /\\|\/|:|\*|\?|\"|<|>|\|/g;
    const sanitizedOutFilename = removeNonAllowedChars(info.videoDetails.title, NON_ALLOWED_CHARS);
    try {
        const stream = (0, ytdl_core_1.default)(url, { filter: "audioonly" });
        const pathname = path_1.default.resolve(exports.AUDIO_DEFAULT_OUTPUT_PATH, sanitizedOutFilename + ".mp3");
        const dlProcess = (0, fluent_ffmpeg_1.default)(stream)
            .audioBitrate(256)
            .withAudioCodec("libmp3lame")
            .toFormat("mp3")
            .saveToFile(pathname);
        return dlProcess;
    }
    catch (error) {
        return undefined;
    }
});
const checkFFMPG = () => {
    const cmd = child_process_1.default.spawnSync("ffmpeg", ["-version"], { shell: true });
    if (cmd.stderr.toString().length > 0) {
        return false;
    }
    return true;
};
exports.checkFFMPG = checkFFMPG;
const removeNonAllowedChars = (filename, chars) => {
    return filename.replace(chars, "");
};
//# sourceMappingURL=index.js.map