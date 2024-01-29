import { Divider, SimpleGrid, Stack, Text } from "@mantine/core";
import { useDebouncedValue, useSetState } from "@mantine/hooks";
import { type GetServerSidePropsContext } from "next";
import { Children } from "react";
import { PlaylistCard } from "~/components/app-page/playlist-card";
import { TrackCard } from "~/components/app-page/track-card";
import { PlayerFooter } from "~/components/footer/player";
import { InternalHeader } from "~/components/header/internal";
import { MainLayout } from "~/components/layout";
import { NavbarComp } from "~/components/navbar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  return {
    props: {},
  };
}

export default function AppPage() {
  const [Query] = useSetState({
    page: 1,
    limit: 20,
  });

  const [DebouncedQuery] = useDebouncedValue(Query, 1000);

  const ListApi = api.track.list.useQuery(DebouncedQuery);
  const ListApi1 = api.playlist.list.private.useQuery(DebouncedQuery);
  const ListApi2 = api.playlist.list.public.useQuery(DebouncedQuery);

  return (
    <>
      <MainLayout
        header={<InternalHeader />}
        navbar={<NavbarComp />}
        footer={<PlayerFooter />}
      >
        <Stack p="md">
          <Text size="xl" fw="bold">
            Top Songs
          </Text>
          <Divider></Divider>
          <SimpleGrid cols={7} spacing={10}>
            {(() => {
              if (ListApi.isLoading) {
                return <div>Loading...</div>;
              }

              if (ListApi.isError) {
                return <div>Error...</div>;
              }

              if (ListApi.isSuccess && ListApi.data.total === 0) {
                return <div>No songs...</div>;
              }

              if (ListApi.isSuccess && ListApi.data.total > 0) {
                return Children.toArray(
                  ListApi.data.tracks.map((track) => {
                    return <TrackCard track={track} />;
                  })
                );
              }
            })()}
          </SimpleGrid>
          <Text size="xl" fw="bold">
            Playlists
          </Text>
          <Divider></Divider>
          <Text size="md" >
            Top Hits
          </Text>
          <SimpleGrid cols={7} spacing={10}>
            {(() => {
              if (ListApi2.isLoading) {
                return <div>Loading...</div>;
              }

              if (ListApi2.isError) {
                return <div>Error...</div>;
              }

              if (ListApi2.isSuccess && ListApi2.data.total === 0) {
                return <div>No songs...</div>;
              }

              if (ListApi2.isSuccess && ListApi2.data.total > 0) {
                return Children.toArray(
                  ListApi2.data.playlists.map((playlist) => {
                    return <PlaylistCard playlist={playlist} />;
                  })
                );
              }
            })()}
          </SimpleGrid>

          <Text size="md" >
            Private Playlists
          </Text>

          <SimpleGrid cols={7} spacing={10}>
            {(() => {
              if (ListApi1.isLoading) {
                return <div>Loading...</div>;
              }

              if (ListApi1.isError) {
                return <div>Error...</div>;
              }

              if (ListApi1.isSuccess && ListApi1.data.total === 0) {
                return <div>No songs...</div>;
              }

              if (ListApi1.isSuccess && ListApi1.data.total > 0) {
                return Children.toArray(
                  ListApi1.data.playlists.map((playlist) => {
                    return <PlaylistCard playlist={playlist} />;
                  })
                );
              }
            })()}
          </SimpleGrid>
        </Stack>
      </MainLayout>
    </>
  );
}
