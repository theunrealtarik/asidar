import { Chip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

const VideoCard = (props: Video) => {
  const [isDownloaded, update] = useState<boolean>(true);

  useInterval(async () => {
    const downloaded = await window.api.peek(props.id, props.audioQuality);
    update(() => downloaded);
  }, 300);

  return (
    <div className="inline-flex space-x-2 w-full">
      <div className="!w-48 !h-28 relative rounded overflow-hidden">
        <img
          src={props.thumbnail}
          className="h-28 object-contain absolute bg-gray-200"
          decoding="async"
          loading="lazy"
        />
      </div>

      <div className="flex-1 overflow-hidden w-40 mt-4">
        <h4 className="font-bold truncate">{props.title}</h4>
        <div className="space-x-1">
          <Chip value={`${props.audioQuality} Kbps`} />
          {!isDownloaded && <Chip value={"Downloading ..."} color="gray" />}
          {isDownloaded && <Chip value={"Downloaded"} color="green" />}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
