export enum EVENTS {
  FFMPEG = "ffmpeg",
  PEEK = "peek",
  DOWNLOAD = "download",
  DOWNLOAD_VIDEO = "download-video",
}

export const YouTubeURL = new RegExp(
  /(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})/g
);

export const ERROR_MESSAGES = {
  invalidURL:
    "The URL provided appears to be invalid for a YouTube video, suggesting that it may not be a valid web address for accessing a YouTube video. It could be expired, broken, or entered incorrectly.",
  noPrevDls: "You do not have any previous downloads",
};
