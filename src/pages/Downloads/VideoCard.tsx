import { Avatar, Box, Group, Header, Image, Stack, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons";
import { Video } from "index";
import React from "react";

export default function VideoCard({ title, thumbnail }: Video) {
  const [w, h] = [180, 100]
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
      </Stack>
    </div>
  );
}
