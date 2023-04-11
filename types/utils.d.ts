type AudioQuality = 96 | 128 | 256 | 320;

type Chunk = {
  frames: NaN;
  currentFps: NaN;
  currentKbps: number;
  targetSize: number;
  timemark: string | undefined;
};

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  length: string;
  audioQuality: AudioQuality;
};
