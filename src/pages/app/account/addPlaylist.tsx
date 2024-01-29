import {
  Button,
  Divider,
  Group,
  NumberInput,
  Radio,
  Stack,
  TextInput,
} from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import { MainLayout } from "~/components/layout";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { useForm } from "@mantine/form";
import { useDidUpdate } from "@mantine/hooks";
import { type PlaylistNew } from "~/lib/zod/playlist";
import router from "next/router";
import { notifications } from "@mantine/notifications";
import { PlayerFooter } from "~/components/footer/player";
import { InternalHeader } from "~/components/header/internal";
import { ProfileNavbarComp } from "~/components/navbar/profile";

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
  const playlistApi = api.playlist.new.useMutation();

  const PlaylistForm = useForm<PlaylistNew>({
    initialValues: {
      title: "",
      image: "",
      type: "public",
      maxSong: 0,
    },
  });

  useDidUpdate(() => {
    if (playlistApi.isSuccess) {
      PlaylistForm.reset();
      notifications.show({
        title: "Playlist created",
        message: "Your playlist has been created",
        color: "green",
      });
      void router.push("/app");
    } else if (playlistApi.error?.data?.zodError) {
      PlaylistForm.setErrors(playlistApi.error?.data?.zodError?.fieldErrors);
    } else if (playlistApi.isError) {
      notifications.show({
        title: "Error",
        message: playlistApi.error.message,
        color: "red",
      });
    }
  }, [playlistApi.isSuccess, playlistApi.isError]);

  return (
    <>
      <MainLayout
        header={<InternalHeader />}
        navbar={<ProfileNavbarComp />}
        footer={<PlayerFooter />}
      >
        <Stack p="md">
          <h2>New Playlist</h2>
          <p>Create a new playlist for you and your loved one&apos;s.</p>
          <Divider pb={8} pt={4} />
          <form
            onSubmit={PlaylistForm.onSubmit((values) => {
              const valuesWithNumber = {
                ...values,
                maxSong: Number(values.maxSong),
              };
              playlistApi.mutate(valuesWithNumber);
            })}
          >
            <TextInput
              withAsterisk
              label="Playlist Title"
              placeholder="Title"
              disabled={playlistApi.isLoading}
              {...PlaylistForm.getInputProps("title")}
              maw={340}
            />

            <TextInput
              withAsterisk
              label="URL of Image for Playlist"
              placeholder="Source"
              disabled={playlistApi.isLoading}
              {...PlaylistForm.getInputProps("image")}
              maw={340}
            />

            <NumberInput
              withAsterisk
              name="maxSong"
              label="Maximum songs you can add"
              placeholder="Maximum Songs"
              hideControls
              disabled={playlistApi.isLoading}
              {...PlaylistForm.getInputProps("maxSong")}
              maw={340}
            />

            <Stack>
              <Radio.Group
                label="Select your type of playlist"
                withAsterisk
                {...PlaylistForm.getInputProps("type")}
              >
                <Group mt="xs">
                  <Radio
                    value="public"
                    label="Public"
                    disabled={playlistApi.isLoading}
                  />
                  <Radio
                    value="private"
                    label="Private"
                    disabled={playlistApi.isLoading}
                  />
                </Group>
              </Radio.Group>
            </Stack>

            <Group justify="flex-start" mt="md">
              <Button type="submit">Create</Button>
            </Group>
          </form>
        </Stack>
      </MainLayout>
    </>
  );
}
