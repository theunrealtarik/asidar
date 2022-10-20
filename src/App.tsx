import { Button, Tabs } from "@mantine/core";
import { IconBrandYoutube, IconDownload, IconSettings } from "@tabler/icons";

import DownloadTab from "./pages/Convert";
import SettingsTab from "./pages/Settings";

import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  test: {
    backgroundColor: theme.colors.dark[8],
    padding: theme.spacing.xs,
    height: "100vh"
  }
}))

function App() {
  const { classes } = useStyles()

  return (
    <main className="app">
      <Tabs variant="pills" orientation="vertical" defaultValue="youtube">
        <Tabs.List className={classes.test}>
          <Tabs.Tab value="youtube" icon={<IconBrandYoutube size={14} />}>
            Youtube
          </Tabs.Tab>
          <Tabs.Tab value="download" icon={<IconDownload size={14} />}>
            Downloads
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <DownloadTab />
        <SettingsTab />
      </Tabs>
    </main>
  );
}

export default App;
