import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import React from "react";

export default function Restore({ dispatch }: any) {
  const [opened, setOpened] = React.useState(false);

  return (
    <>
      <Button
        color="gray"
        onClick={() => {
          setOpened(true);
        }}
      >
        Restore
      </Button>

      <Modal
        centered={true}
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text>Settings restoration</Text>}
      >
        <Stack>
          <Text>
            Are you sure you want to restore your preferences to the app's
            default?
          </Text>
          <Group position="right">
            <Button color="gray" onClick={() => setOpened(false)}>
              No
            </Button>
            <Button
              onClick={() => {
                dispatch();
                setOpened(false);
              }}
            >
              Yes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
