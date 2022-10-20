const ffmpeg = require("ffmpeg-static");
const ffmetadata = require("ffmetadata");
const cp = require("child_process");
const path = require("path");
const fs = require("fs");

ffmetadata.setFfmpegPath(ffmpeg);

let USER_HOMEDIR = process.env.HOMEPATH;

if (typeof USER_HOMEDIR == "undefined") {
  USER_HOMEDIR = "./";
}

const DEFAULT_DL_PATH = path.resolve(USER_HOMEDIR, "Music", "Asidar");

module.exports = async function convert(
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

  const pathname = path.resolve(
    options.path,
    options.fileprefix + options.filename + ".mp3"
  );
  const data = cp.spawn(
    String(ffmpeg),
    [
      "-loglevel",
      "8",
      "-hide_banner",
      "-progress",
      "pipe:3",
      "-i",
      "pipe:4",
      "-b:a",
      `${options.audioQuality}k`,
      pathname,
    ],
    {
      windowsHide: true,
      stdio: ["inherit", "inherit", "inherit", "pipe", "pipe"],
    }
  );

  stream.pipe(data?.stdio[4]);
};

module.exports = { DEFAULT_DL_PATH, USER_HOMEDIR };
