import ytdl from "ytdl-core";

declare global {
  interface Window {
    api: {
      request: (
        url: string,
        audioQuality: AudioQuality
      ) => Promise<ytdl.MoreVideoDetails>;
      peek: (id: string, audioQuality: AudioQuality) => Promise<boolean>;
      isFfmpegInstalled: () => Prmise<boolean>;
    };
  }
}

export {};
