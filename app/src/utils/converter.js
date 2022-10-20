const ffmpeg = require("fluent-ffmpeg");
const ytdl = require("ytdl-core");
const path = require("path");
const fs = require("fs");

let USER_HOMEDIR = process.env.HOMEPATH;

if (typeof USER_HOMEDIR == "undefined") {
  USER_HOMEDIR = "./";
}

const DEFAULT_DL_PATH = path.resolve(USER_HOMEDIR, "Music", "Asidar");

async function convert(
  url,
  options = { filename, fileprefix, path, audioQuality }
) {
  if (typeof url != "string") return;
  if (typeof options.audioQuality == "undefined") options.audioQuality == 128;
  if (typeof options.path != "string") {
    if (!fs.existsSync(DEFAULT_DL_PATH)) {
      fs.mkdirSync(DEFAULT_DL_PATH, { recursive: true });
    }

    options.path = DEFAULT_DL_PATH;
  }

  const stream = ytdl(url, { filter: "audioonly" });

  const pathname = path.resolve(
    options.path,
    options.fileprefix + options.filename + ".mp3"
  );

  // Start encoding
  const proc = ffmpeg(stream)
    .audioBitrate(options.audioQuality)
    .withAudioCodec("libmp3lame")
    .toFormat("mp3")
    .on("error", function (err) {
      return callback(err.message, null);
    })
    .saveToFile(pathname);
}

module.exports = { convert, DEFAULT_DL_PATH, USER_HOMEDIR };
