import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import path from "path";
import cp from "child_process";
import fs from "fs";

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
  ): Promise<ffmpeg.FfmpegCommand | undefined> => {
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

      const dlProcess = ffmpeg(stream)
        .audioBitrate(audioQuality)
        .withAudioCodec("libmp3lame")
        .toFormat("mp3")
        .saveToFile(pathname);

      return dlProcess;
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
