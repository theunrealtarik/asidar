import { useState } from "react";
import { Tabs } from "@mantine/core";
import { IconBrandYoutube, IconDownload, IconSettings } from "@tabler/icons";
import { createStyles } from "@mantine/core";
import { Video } from "index";

import ConvertTab from "./pages/Convert";
import DownloadTab from "pages/Downloads";
import SettingsTab from "./pages/Settings";

import DownloadsContext from "contexts/DownloadsContext";

const useStyles = createStyles((theme) => ({
  tabList: {
    backgroundColor: theme.colors.dark[8],
    padding: theme.spacing.xs,
    height: "100vh",
  },
}));

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const { classes } = useStyles();

  return (
    <main className="app">
      <Tabs variant="pills" orientation="vertical" defaultValue="youtube">
        <Tabs.List className={classes.tabList}>
          <Tabs.Tab value="youtube" icon={<IconBrandYoutube size={14} />}>
            Converter
          </Tabs.Tab>
          <Tabs.Tab value="download" icon={<IconDownload size={14} />}>
            Downloads
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <DownloadsContext.Provider value={{ videos, setVideos }}>
          <ConvertTab />
          <DownloadTab />
        </DownloadsContext.Provider>
        <SettingsTab />
      </Tabs>
    </main>
  );
}

export default App;
