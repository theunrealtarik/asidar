import { Box, Code, Image, Stack, Text } from "@mantine/core";

export default function Error() {
  return (
    <div style={{
      display: "grid",
      placeItems: "center",
      height: "100vh"
    }}>
      <Stack>
        <Text>
          <b>ffmpeg</b> is not installed in your computer.
        </Text>
      </Stack>
    </div>
  )
}
