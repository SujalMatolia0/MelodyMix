import { Avatar, Card, Group, Table, Text } from "@mantine/core";
import { useSetAtom } from "jotai";
import { LikedTrackAtom } from "~/lib/jotai";
import { type LikedObj } from "~/lib/type";

interface LikedPlaylist {
  liked: LikedObj;
}

export const LikedPlaylistCard = (props: LikedPlaylist) => {
  const setLikedTrack = useSetAtom(LikedTrackAtom);

  const handleCardClick = () => {
    setLikedTrack(props.liked);
  };

  return (
    <Table onClick={handleCardClick} verticalSpacing="md" miw={600}>
      <Table.Tr key={props.liked.title}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={30} src={props.liked.image} radius={30} />
            <div>
              <Text fz="sm" fw={500}>
                {props.liked.title}
              </Text>
              <Text c="dimmed" fz="xs">
                {props.liked.artist}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{props.liked.type}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" style={{ display: "inline" }}>
            {props.liked.length} 
          </Text>
          <Text c="dimmed" fz="xs" style={{ display: "inline" }}>
             sec
          </Text>
        </Table.Td>
      </Table.Tr>
    </Table>
  );
};
