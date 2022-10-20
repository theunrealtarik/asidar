import { Loader, Stack } from "@mantine/core";

export default function Loading() {
  return (
    <Stack
      align={"center"}
      justify={"center"}
      style={{ height: "calc(100vh - 20px)" }}
    >
      <Loader />
    </Stack>
  );
}
