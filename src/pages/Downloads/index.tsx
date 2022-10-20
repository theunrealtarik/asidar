import { ActionIcon, Group, Space, Stack, Tooltip } from "@mantine/core";
import { useContext } from "react";
import { Video } from "index";
import { IconTrash } from "@tabler/icons";

import React from "react";
import Panel from "components/Panel";
import DownloadsContext from "contexts/DownloadsContext";
import VideoCard from "./VideoCard";

const { ipcRenderer } = window.require("electron");

export default function DownloadTab() {
  const { videos, setVideos } = useContext(DownloadsContext);

  return (
    <Panel value="download">
      <Stack
        style={{ height: "calc(100vh - 58px)", overflowY: "scroll" }}
        align={videos.length == 0 ? "center" : "start"}
        justify={videos.length == 0 ? "center" : "start"}
      >
        {videos.length == 0 ? (
          <div>You didn't download anything yet 😁</div>
        ) : (
          videos.map((video: Video, index: number) => (
            <VideoCard key={index} {...video} />
          ))
        )}
      </Stack>
      <Group position="right" mt="10px">
        <Tooltip
          label="clear all downloads history"
          transition="pop"
          openDelay={200}
          withArrow
          hidden={videos.length == 0}
        >
          <ActionIcon
            disabled={videos.length == 0}
            variant="filled"
            color="red"
            onClick={() => {
              setVideos(() => []);
              ipcRenderer.invoke("clear");
            }}
          >
            <IconTrash size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Panel>
  );
}
