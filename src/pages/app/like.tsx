import { SimpleGrid, Stack, Title } from "@mantine/core";
import { useSetState, useDebouncedValue } from "@mantine/hooks";
import { type GetServerSidePropsContext } from "next";
import { Children } from "react";
import { LikedPlaylistCard } from "~/components/app-page/liked-playlist";
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

export default function LikePage() {
  const [Query] = useSetState({
    page: 1,
    limit: 20,
  });

  const [DebouncedQuery] = useDebouncedValue(Query, 1000);

  const ListApi = api.likeList.useQuery(DebouncedQuery);

  return (
    <MainLayout
      header={<InternalHeader />}
      navbar={<NavbarComp />}
      footer={<PlayerFooter />}
    >
      <Stack p="md">
        <Title order={2}>Liked Playlist</Title>
        <SimpleGrid cols={7} spacing={10}>
          {ListApi.isLoading && <div>Loading...</div>}

          {ListApi.isError && <div>Error...</div>}

          {ListApi.isSuccess && ListApi.data.total === 0 && (
            <div>No songs...</div>
          )}

          {ListApi.isSuccess &&
            ListApi.data.total > 0 &&
            Children.toArray(
              ListApi.data.tracks.map((track) => (
                <LikedPlaylistCard liked={track} />
              ))
            )}
        </SimpleGrid>
      </Stack>
    </MainLayout>
  );
}
