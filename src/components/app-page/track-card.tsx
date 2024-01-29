import { AspectRatio, Image, Paper, Stack, Text } from "@mantine/core";
import { useSetAtom } from "jotai";
import { CurrentTrackAtom } from "~/lib/jotai";
import { type TrackObj } from "~/lib/type";

interface TrackCardProps {
  track: TrackObj;
}

export const TrackCard = (props: TrackCardProps) => {
  const setCurrentTrack = useSetAtom(CurrentTrackAtom);

  return (
    <>
      <Paper
        style={{
          cursor: "pointer",
        }}
        onClick={() => setCurrentTrack(props.track)}
      >
        <Stack gap={5}>
          <AspectRatio ratio={9 / 12}>
            <Image
              radius="sm"
              src={props.track.image}
              alt={props.track.title}
              fit="cover"
            />
          </AspectRatio>

          <Stack gap={0}>
            <Text size="sm" fw="bold">
              {props.track.title}
            </Text>

            <Text size="xs" c="dimmed">
              {props.track.artist}
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};
