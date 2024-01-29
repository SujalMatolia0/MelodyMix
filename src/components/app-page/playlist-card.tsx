import { AspectRatio, Image, Paper, Stack, Text } from "@mantine/core";
import { useSetAtom } from "jotai";
import { CurrentPlaylistAtom } from "~/lib/jotai";
import { type PlatlistObj } from "~/lib/type";

interface TrackCardProps {
  playlist: PlatlistObj;
}

export const PlaylistCard = (props: TrackCardProps) => {
  const setCurrentTrack = useSetAtom(CurrentPlaylistAtom);

  return (
    <>
      <Paper
        style={{
          cursor: "pointer",
        }}
        onClick={() => setCurrentTrack(props.playlist)}
      >
        <Stack gap={5}>
          <AspectRatio ratio={9 / 12}>
            <Image
              radius="sm"
              src={props.playlist.image}
              alt={props.playlist.title}
              fit="cover"
            />
          </AspectRatio>

          <Stack gap={0}>
            <Text size="sm" fw="bold">
              {props.playlist.title}
            </Text>

            <Text size="xs" c="dimmed">
              {props.playlist.songsCount}
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};
