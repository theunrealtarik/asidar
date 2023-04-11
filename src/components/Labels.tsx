import { Check, X } from "react-feather";
import { useFfmpeg } from "../hooks";

export default class Labels {
  static FFMPEG() {
    const ffmpeg = useFfmpeg();

    if (ffmpeg.isLoading) {
      return (
        <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
      );
    }

    if (!ffmpeg.isInstalled) {
      return (
        <div className="inline-flex items-center space-x-1 cursor-default">
          <X className="p-1 bg-red-400 rounded-full" size={20} />
          <span className="text-xs text-gray-800">FFmpeg is not installed</span>
        </div>
      );
    }

    return (
      <div className="inline-flex items-center space-x-1 cursor-default">
        <Check className="p-1 bg-green-400 rounded-full" size={20} />
        <span className="text-xs text-gray-800">FFmpeg is installed</span>
      </div>
    );
  }
}
