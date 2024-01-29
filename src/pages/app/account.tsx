import {
  Avatar,
  Button,
  Divider,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import { PlayerFooter } from "~/components/footer/player";
import { InternalHeader } from "~/components/header/internal";
import { MainLayout } from "~/components/layout";
import { ProfileNavbarComp } from "~/components/navbar/profile";
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
  const userApi = api.user.useQuery();

  return (
    <>
      <MainLayout
        header={<InternalHeader />}
        navbar={<ProfileNavbarComp />}
        footer={<PlayerFooter />}
      >
        <Stack p="md">
          <h2>Profile</h2>
          <p>This is how others will see you on the site.</p>
          <Divider pb={8} pt={4} />
          <Avatar
            src={userApi.isSuccess ? userApi.data.image : ""}
            alt="it's me"
            size="xl"
          />
          <form>
            {(() => {
              if (userApi.isLoading) {
                return <div>Loading...</div>;
              }

              if (userApi.isError) {
                return <div>Error...</div>;
              }

              if (userApi.isSuccess) {
                const { data } = userApi;
                return (
                  <>
                    <TextInput
                      label="Username"
                      placeholder={data.name ?? ""}
                      maw={340}
                    />

                    <TextInput
                      label="Email"
                      placeholder={data.email ?? ""}
                      maw={340}
                    />
                  </>
                );
              }
            })()}

            <Group justify="flex-start" mt="md">
              <Button type="submit">Update Profile</Button>
            </Group>
          </form>
        </Stack>
      </MainLayout>
    </>
  );
}
