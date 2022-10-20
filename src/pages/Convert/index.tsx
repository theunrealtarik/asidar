import { useReducer, useState } from "react";

import { ActionIcon, Input, Stack } from "@mantine/core";
import Panel from "components/Panel";

import { IconArrowRight, IconDownload } from "@tabler/icons";
import VideoCard from "./VideoCard";
import Loading from "./Loading";

const { ipcRenderer } = window.require("electron");

export default function DownloadTab() {
  const [found, setFound] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);

  const [video, dispatch] = useReducer(reducer, {});
  const [query, setQueryString] = useState<string>("");

  function RequestConversion() {
    dispatch({ type: "START_FETCHING" });
    ipcRenderer
      .invoke("download", query)
      .then((res: any) => {
        dispatch({ type: "ON_FETCHED", payload: res });
        setFound(true)
      })
      .catch((err: Error) => {
        dispatch({ type: "ERROR" });
      });
  }

  console.log(video);
  return (
    <Panel value="youtube">
      {video.loading ? (
        <Loading />
      ) : (
        <Stack spacing={"md"} sx={() => ({ height: "calc(100vh - 20px)" })}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Input.Wrapper sx={() => ({ width: "100%" })}>
              <Input
                invalid={!valid}
                placeholder="some youtube link"
                onChange={(e: any) => {
                  let value = e.target.value;
                  setQueryString(value);
                  setValid(isUrlValid(value));
                }}
              />
            </Input.Wrapper>
            <ActionIcon
              onClick={RequestConversion}
              size={"lg"}
              variant="filled"
              disabled={query.length == 0 || !isUrlValid(query)}
            >
              <IconArrowRight size={"20"} />
            </ActionIcon>
          </div>
          <VideoCard
            hide={!found}
            videoThumbnail={video?.metadata?.thumbnail}
            videoTitle={video?.metadata?.title}
          />
        </Stack>
      )}
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
