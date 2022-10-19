const ffmpeg = require("ffmpeg-static");
const ffmetadata = require("ffmetadata");
const ytdl = require("ytdl-core");
const mt = require("ytdl-getinfo");
const cp = require("child_process");
const path = require("path");
const fs = require("fs");

ffmetadata.setFfmpegPath(ffmpeg);

let USER_HOMEDIR = process.env.HOMEPATH;

if (typeof USER_HOMEDIR == "undefined") {
  USER_HOMEDIR = "./";
}

const DEFAULT_DL_PATH = path.resolve(USER_HOMEDIR, "Music", "Asidar");

module.exports = async function convert(url, _filename, _path) {
  if (typeof url != "string") return;
  if (typeof _path != "string") {
    if (!fs.existsSync(DEFAULT_DL_PATH)) {
      fs.mkdirSync(DEFAULT_DL_PATH, { recursive: true });
    }

    _path = DEFAULT_DL_PATH;
  }

  const metadata = (await mt.getInfo(url, [], false)).items[0];
  const stream = ytdl(url, { filter: "audioonly" });

  if (typeof _filename == "undefined") {
    _filename = metadata.title;
  }

  const pathname = path.resolve(_path, _filename + ".mp3");
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
      "128k",
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
