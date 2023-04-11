import { YouTubeURL } from "../../constants";
import { useFfmpeg } from "../hooks";
import { HistoryAtom } from "../context";

import { useAtom } from "jotai/react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";

export default function DownloadView() {
  const ffmpeg = useFfmpeg();
  const form = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useAtom(HistoryAtom);

  const submitHandler = (data: Inputs) => {
    setLoading(true);
    window.api
      .request(data.url, data.quality)
      .then((details) => {
        setHistory((prev) => {
          if (
            prev.find(
              (video) =>
                video.id === details.videoId &&
                video.audioQuality === form.getValues("quality")
            )
          )
            return prev;

          return [
            ...prev,
            {
              id: details.videoId,
              length: details.lengthSeconds,
              thumbnail: details.thumbnails[0].url,
              title: details.title,
              audioQuality: data.quality,
            },
          ];
        });
        form.reset();
      })
      .catch(() => alert("Try clicking download again ... 👀"))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={form.handleSubmit(submitHandler)} className="w-full h-full">
      <Input
        label="YouTube Video Link"
        className="!w-full"
        color={form.formState.errors.url ? "red" : "blue"}
        disabled={!ffmpeg.isInstalled || loading}
        {...form.register("url", { required: true, pattern: YouTubeURL })}
      />
      <div className="flex gap-x-2 items-center w-full mt-4">
        <Controller
          name="quality"
          control={form.control}
          {...form.register("quality", { required: true })}
          render={({ field }) => (
            <Select
              label="Audio Quality"
              disabled={!ffmpeg.isInstalled || loading}
              color={form.formState.errors.quality ? "red" : "blue"}
              {...field}
            >
              {QUALITIES.map((quality) => (
                <Option value={quality.toString()}>{quality} Kbps</Option>
              ))}
            </Select>
          )}
        />

        <Button
          type="submit"
          className="w-1/2"
          disabled={!ffmpeg.isInstalled || loading}
          color={
            !!form.formState.errors.url || !!form.formState.errors.quality
              ? "red"
              : "blue"
          }
        >
          download
        </Button>
      </div>
    </form>
  );
}

interface Inputs {
  url: string;
  quality: AudioQuality;
}

const QUALITIES = [96, 128, 256, 320];
