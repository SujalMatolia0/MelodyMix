import { Stack,  Text,  SimpleGrid } from "@mantine/core";
import { useSetState, useDebouncedValue } from "@mantine/hooks";
import { type GetServerSidePropsContext } from "next";
import { Children } from "react";
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
  return (
    <>
      <MainLayout
        header={<InternalHeader />}
        navbar={<NavbarComp />}
        footer={<PlayerFooter />}
      >
        <Stack p="md">
          <Text size="xl" fw="bold">
          All Songs
          </Text>
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
        </Stack>
      </MainLayout>
    </>
  );
}
