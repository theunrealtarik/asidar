import { Typography } from "@material-tailwind/react";
import { ERROR_MESSAGES } from "../../../constants";
import { useAtom } from "jotai/react";
import { HistoryAtom } from "../../context";
import VideoCard from "./VideoCard";

export default function HistoryView() {
  const [history, setHistory] = useAtom(HistoryAtom);

  if (history.length === 0) {
    return (
      <div className="w-full h-full grid place-content-center">
        <Typography>{ERROR_MESSAGES.noPrevDls}</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {history.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
}
