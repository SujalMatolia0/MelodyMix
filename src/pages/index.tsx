import { Center, Stack, Text, Title } from "@mantine/core";
import { ExternalHeader } from "~/components/header/external";
import { MainLayout } from "~/components/layout";

export default function HomePage() {
  return (
    <>
      <MainLayout header={<ExternalHeader />}>
        <Center h="calc(100vh - 60px)">
          <Stack align="center">
            <Title ta="center">Melody Mix</Title>

            <Text maw={650} ta="center" size="sm">
              Melody Mix is a music streaming service that allows you to create
              playlists based on your mood. You can choose from a variety of
              genres and moods to create a playlist that fits your vibe.
            </Text>
          </Stack>
        </Center>
      </MainLayout>
    </>
  );
}
