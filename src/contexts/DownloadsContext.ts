import { Video } from "index";
import React, { createContext } from "react";

export interface DownloadContextInterface {
  videos: Video[];
  setVideos: any;
}

export default createContext<DownloadContextInterface>({
  videos: [],
  setVideos: () => {},
});
