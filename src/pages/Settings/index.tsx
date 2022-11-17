import {
  Button,
  FileInput,
  Group,
  Input,
  Select,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useReducer, useState } from "react";
import Panel from "components/Panel";
import Restore from "./Resotration";

const os = window.require("os");
const { ipcRenderer } = window.require("electron");

export default function SettingsTab() {
  const [user, setUser] = useState(os.userInfo());
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    ipcRenderer.invoke("user-prefs").then((data: any) => {
      dispatch({ type: ACTIONS.INITIALIZE, payload: data });
    }).catch((err : Error) => {
      alert(`failed to load user prefernces\nError:  ${err.message}`)
    });

    return () => {
      dispatch({ type: -1 });
    };
  }, []);

  const handlers = {
    DirPickHandler: (selectedFolder: any) => {
      if (!selectedFolder?.canceled) {
        dispatch({
          type: ACTIONS.UPDATE.DIR,
          payload: selectedFolder,
        });
      }
    },
    InputChangeHandler: (event: any) => {
      let key = event.target.name;
      let value = event.target.value;

      dispatch({
        type: ACTIONS.UPDATE.INPUT,
        payload: {
          key: key,
          value: value,
        },
      });
    },
    SaveHandler: () => {
      ipcRenderer.invoke("save", state.user).then(() => {
        dispatch({
          type: ACTIONS.SAVE,
        });
        alert("All of your settings have been saved succefuly !");
      }).catch((err: Error) => console.log(err.message));
    },
  };

  return (
    <>
      <Panel
        value="settings"
        title={
          (typeof user.username == "string" ? user.username : "user") +
          "'s preferences"
        }
      >
        <Space h="xl" />
        <Stack
          justify="space-between"
          sx={() => ({ height: "calc(100vh - 95px)" })}
        >
          <Stack className="inputs">
            <Input.Wrapper label="file name prefix">
              <Input
                placeholder={
                  state?.user?.filePrefix ||
                  `i.g: ${new Date().getFullYear()}-Weekend Whip.mp3`
                }
                onChange={handlers.InputChangeHandler}
                name="filePrefix"
              />
            </Input.Wrapper>
            <Group grow>
              <FileInput
                placeholder={state?.user?.defaultDownloadsPath}
                label="default downloads location"
                onClick={() => {
                  ipcRenderer
                    .invoke("select-dir")
                    .then(handlers.DirPickHandler);
                }}
              />

              <Select
                label="audio quality"
                placeholder={state?.user?.audioQuality + " Kbps"}
                name="audio"
                defaultValue={state?.user?.audioQuality}
                onChange={(q) => {
                  dispatch({
                    type: ACTIONS.UPDATE.AUDIO,
                    payload: q,
                  });
                }}
                data={[
                  { value: "96", label: "96 Kpbs" },
                  { value: "128", label: "128 Kpbs" },
                  { value: "256", label: "256 Kpbs" },
                  { value: "320", label: "320 Kpbs" },
                ]}
              />
            </Group>
          </Stack>

          <Stack
            justify="flex-end"
            align="center"
            style={{ flexDirection: "row" }}
          >
            <Restore
              dispatch={() => {
                dispatch({ type: ACTIONS.RESTORE });
              }}
            />
            <Button disabled={!state.edited} onClick={handlers.SaveHandler}>
              Save
            </Button>
          </Stack>
        </Stack>
        <Text></Text>
      </Panel>
    </>
  );
}

function reducer(
  state: any,
  action: { type: string | number; payload?: any }
): any {
  switch (action.type) {
    case ACTIONS.INITIALIZE:
      return { edited: false, ...action.payload };
    case ACTIONS.SAVE:
      return { ...state, edited: false };

    case ACTIONS.RESTORE:
      return {
        ...state,
        edited: true,
        user: { ...state.defaultPrefs },
      };

    case ACTIONS.UPDATE.DIR:
      return {
        ...state,
        edited: true,
        user: {
          ...state.user,
          defaultDownloadsPath: action.payload.filePaths[0],
        },
      };

    case ACTIONS.UPDATE.INPUT:
      return {
        ...state,
        edited: true,
        user: {
          ...state.user,
          [action.payload?.key]: action.payload?.value,
        },
      };

    case ACTIONS.UPDATE.AUDIO:
      return {
        ...state,
        edited: true,
        user: {
          ...state.user,
          audioQuality: action.payload,
        },
      };

    default:
      return state;
  }
}

const ACTIONS = {
  INITIALIZE: "init-state",
  SAVE: "save",
  RESTORE: "restore",
  UPDATE: {
    DIR: "dir",
    INPUT: "input",
    AUDIO: "select",
  },
};
