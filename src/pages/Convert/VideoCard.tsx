import { Avatar, Box, Group, Header, Image, Stack, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons";
import React from "react";

export default function VideoCard({
  videoTitle,
  videoThumbnail,
  hide,
}: VideoCardType) {
  if (hide) {
    return <div className="not"></div>;
  }

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
          width: 220,
          height: 120,
          borderRadius: theme.radius.md,
        })}
      >
        <Image height={120} width={220} radius={"md"} src={videoThumbnail} />
      </Box>
      <Stack>
        <Text size={"lg"} weight={600} lineClamp={2}>
          {videoTitle}
        </Text>
      </Stack>
    </div>
  );
}

interface VideoCardType {
  videoThumbnail: string;
  videoTitle: string;
  hide: boolean;
}
