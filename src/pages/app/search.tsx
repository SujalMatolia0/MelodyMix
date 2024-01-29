import React, { Children, useState } from "react";
import { SimpleGrid, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { type GetServerSidePropsContext } from "next";
import { MainLayout } from "~/components/layout";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { useDebouncedValue } from "@mantine/hooks";
import { InternalHeader } from "~/components/header/internal";
import { NavbarComp } from "~/components/navbar";
import { PlayerFooter } from "~/components/footer/player";
import { TrackCard } from "~/components/app-page/track-card";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function SearchPage() {
  const [Query, setQuery] = useState("");

  const [DebouncedQuery] = useDebouncedValue(Query, 1000);

  const SearchApi = api.track.search.useQuery(DebouncedQuery, {
    enabled: DebouncedQuery !== "",
  });

  return (
    <>
      <MainLayout
        header={<InternalHeader />}
        navbar={<NavbarComp />}
        footer={<PlayerFooter />}
      >
        <Stack p="md">
          <TextInput
            radius="sm"
            placeholder="Search..."
            rightSection={<IconSearch size={18} />}
            value={Query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />

          <SimpleGrid cols={7} spacing={10}>
            {(() => {
              if (DebouncedQuery === "") {
                return <div>Search for something...</div>;
              }

              if (SearchApi.isLoading) {
                return <div>Loading...</div>;
              }

              if (SearchApi.isError) {
                return <div>Error...</div>;
              }

              if (SearchApi.isSuccess && SearchApi.data.total === 0) {
                return <div>No songs...</div>;
              }

              if (SearchApi.isSuccess && SearchApi.data.total > 0) {
                return Children.toArray(
                  SearchApi.data.tracks.map((track) => {
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
