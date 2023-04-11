import ytdl from "ytdl-core";
import path from "path";
import cp from "child_process";

export const AUDIO_DEFAULT_OUTPUT_PATH = path.join(
  process.env.HOMEDRIVE,
  process.env.HOMEPATH,
  "Music"
);

export class Converter {
  static convertAudio = async (
    url: string,
    info: ytdl.videoInfo,
    audioQuality: AudioQuality
  ) => {
    const NON_ALLOWED_CHARS = /\\|\/|:|\*|\?|\"|<|>|\|/g;

    const sanitizedOutFilename = removeNonAllowedChars(
      info.videoDetails.title,
      NON_ALLOWED_CHARS
    );

    try {
      const stream = ytdl(url, { filter: "audioonly" });
      const pathname = path.resolve(
        AUDIO_DEFAULT_OUTPUT_PATH,
        `${audioQuality}_${sanitizedOutFilename}.mp3`
      );

      // const dlProcess = ffmpeg(stream)
      //   .audioBitrate(audioQuality)
      //   .withAudioCodec("libmp3lame")
      //   .toFormat("mp3")
      //   .saveToFile(pathname);

      const ffmpegProcess = cp.spawn("ffmpeg", [
        "-i",
        "-",
        "-b:a",
        `${audioQuality}`,
        "-c:a",
        "libmp3lame",
        "-f",
        "mp3",
        pathname,
      ]);

      ffmpegProcess.stdin.on("error", (err) => {
        console.error("Error with stdin:", err);
      });

      stream.pipe(ffmpegProcess.stdin);

      return ffmpegProcess;
    } catch (error) {
      return undefined;
    }
  };
}

export const checkFFMPG = (): boolean => {
  const cmd = cp.spawnSync("ffmpeg", ["-version"], { shell: true });

  if (cmd.stderr.toString().length > 0) {
    return false;
  }
  return true;
};

const removeNonAllowedChars = (filename: string, chars: RegExp) => {
  return filename.replace(chars, "");
};
