import {
  ActionIcon,
  Center,
  Group,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { api } from "~/utils/api";
import { NavBarButton } from "./button";

export const NavbarPlaylistComp = () => {
  const GetPlaylistApi = api.playlist.list.private.useQuery({
    limit: 50,
    page: 1,
  });

  return (
    <>
      <Stack gap={0}>
        <Group justify="space-between">
          <Title order={4}>Playlists</Title>

          <Group>
            <ActionIcon
              size="xs"
              variant="transparent"
              disabled={GetPlaylistApi.isLoading}
              onClick={() => {
                window.location.href = "/app/account/addPlaylist";
              }}
            >
              <IconPlus size={18} />
            </ActionIcon>

            <ActionIcon
              size="xs"
              variant="transparent"
              disabled={GetPlaylistApi.isLoading}
              onClick={() => GetPlaylistApi.refetch()}
            >
              <IconRefresh size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Space h="xs" />

        {(() => {
          if (GetPlaylistApi.isLoading) {
            return (
              <>
                {Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} h={28} mt="sm" />
                  ))}
              </>
            );
          }

          if (GetPlaylistApi.isError) {
            return (
              <>
                <Text c="red.5" size="xs">
                  Unexpected error occurred while fetching your playlists,
                  please try again else contact skull.
                </Text>
              </>
            );
          }

          if (GetPlaylistApi.isSuccess) {
            if (GetPlaylistApi.data.total > 0) {
              return (
                <>
                  {GetPlaylistApi.data.playlists.map((playlist) => (
                    <NavBarButton
                      key={playlist.id}
                      href={`/app/playlist/${playlist.id}`}
                      icon={
                        <Text size="sm" fw="bold" c="gray.6">
                          {playlist.songsCount}:
                        </Text>
                      }
                    >
                     {playlist.title}
                    </NavBarButton>
                  ))}
                </>
              );
            } else {
              return (
                <>
                  <Center h={100}>
                    <Text size="xs" ta="center" c="gray.6">
                      No playlist found
                    </Text>
                  </Center>
                </>
              );
            }
          }
        })()}
      </Stack>
    </>
  );
};
