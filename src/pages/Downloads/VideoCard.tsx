import {
  Box,
  Group,
  Image,
  Loader,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Video } from "index";
import { IconCheck } from "@tabler/icons";
import { useInterval } from "@mantine/hooks";

const { ipcRenderer } = window.require("electron");

export default function VideoCard({ title, thumbnail, id }: Video) {
  const [isDownloading, update] = useState<boolean>(true);
  const [w, h] = [180, 100];

  const interval = useInterval(() => {
    ipcRenderer.invoke("progress", id).then((status: boolean) => update(!status));
  }, 200);

  useEffect(() => {
    interval.start();

    if (!isDownloading) {
      interval.stop();
    }

    return () => interval.stop();
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.dark[5],
          width: w,
          height: h,
          borderRadius: theme.radius.md,
        })}
      >
        <Image height={h} width={w} radius={"md"} src={thumbnail} />
      </Box>
      <Stack>
        <Text size={"md"} weight={600} lineClamp={2}>
          {title}
        </Text>
        {isDownloading ? (
          <Loader size={"xs"} />
        ) : (
          <IconCheck size={20} color="green" />
        )}
      </Stack>
    </div>
  );
}
