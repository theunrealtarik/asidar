import { useContext, useState } from "react";
import { Button, Group, Input, LoadingOverlay, Stack } from "@mantine/core";
import { IconDownload } from "@tabler/icons";
import { Video } from "index";

import Panel from "components/Panel";
import DownloadContext from "contexts/DownloadsContext";

const { ipcRenderer } = window.require("electron");

export default function ConvertTab() {
  const [query, setQueryString] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const { videos, setVideos } = useContext(DownloadContext);

  function RequestConversion() {
    setQueryString("");
    setPending(true);
    ipcRenderer
      .invoke("download", query)
      .then((metadata: any) => {
        if (typeof metadata == "undefined") return;
        setVideos((prevVideoList: Video[]) => {
          let cached = prevVideoList.find(
            (video) => video.id == metadata?.display_id
          );

          if (!cached) {
            return [
              ...prevVideoList,
              {
                title: metadata?.title,
                thumbnail: metadata?.thumbnail,
                id: metadata?.display_id,
              },
            ];
          }

          return prevVideoList;
        });
        setPending(false);
      })
      .catch((err: Error) => {
        alert(
          String(err.message) +
            "\nContact the developers to fix this error ASAP."
        );
        setPending(false);
      });
  }

  return (
    <Panel value="youtube">
      <LoadingOverlay
        visible={pending}
        overlayBlur={0.8}
        overlayOpacity={0.1}
        sx={() => ({ maxWidth: "100%" })}
      />
      <Stack spacing={"md"} sx={() => ({ height: "calc(100vh - 20px)" })}>
        <Input.Wrapper sx={() => ({ width: "100%" })}>
          <Input
            name="query"
            placeholder="some youtube link"
            value={query}
            onChange={(e: any) => setQueryString(e.target.value)}
          />
        </Input.Wrapper>
        <Group position="right">
          <Button
            leftIcon={<IconDownload size={20} />}
            onClick={RequestConversion}
            disabled={!isUrlValid(query)}
          >
            Download
          </Button>
        </Group>
      </Stack>
    </Panel>
  );
}

function isUrlValid(url: string) {
  let matches = url.match(
    /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g
  );
  if (matches) {
    return true;
  }
  return false;
}

function reducer(state: any, action: Action) {
  switch (action.type) {
    case "START_FETCHING":
      return {
        loading: true,
        error: null,
        metadata: null,
      };
    case "ON_FETCHED":
      return {
        loading: false,
        error: null,
        metadata: action.payload,
      };

    case "ERROR":
      return {
        loading: false,
        error: true,
        metadata: null,
      };

    default:
      return state;
  }
}

interface Action {
  type: "START_FETCHING" | "ON_FETCHED" | "ERROR";
  payload?: any;
}
