import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconArrowsShuffle,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconRepeat,
  IconRepeatOff,
  IconRepeatOnce,
  IconVolume,
  IconVolumeOff,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import { CurrentTrackAtom, PlayerAtom } from "~/lib/jotai";
import { api } from "~/utils/api";

export const PlayerFooter = () => {
  const PlayerRef = useRef<ReactHowler | null>(null);

  const [isLiked, setIsLiked] = useState(false);

  const [CurrentTrack] = useAtom(CurrentTrackAtom);

  const [PlayerState, setPlayerState] = useAtom(PlayerAtom);

  const LikeApi = api.like.useMutation();

  const InternalProgressUpdate = () => {
    if (PlayerRef.current && PlayerState.loaded) {
      setPlayerState((player) => {
        player.progress = PlayerRef.current?.seek() ?? 0;
      });
    }
  };

  const ProgrssUpdateInterval = useInterval(
    () => InternalProgressUpdate(),
    1000
  );

  useEffect(() => {
    if (PlayerRef.current && PlayerState.loaded && CurrentTrack) {
      setPlayerState((player) => {
        player.duration = PlayerRef.current?.duration() ?? 0;
        player.progress = PlayerRef.current?.seek() ?? 0;
      });
    }
  }, [CurrentTrack, PlayerState.loaded]);

  return (
    <>
      <ReactHowler
        ref={PlayerRef}
        preload
        src={
          CurrentTrack?.source
            ? [CurrentTrack.source]
            : "http://goldfirestudios.com/proj/howlerjs/sound.ogg"
        }
        playing={PlayerState.playing}
        loop={PlayerState.repeat === "all"}
        volume={PlayerState.volume}
        mute={PlayerState.mute}
        onPlay={() => {
          console.log("play");
          ProgrssUpdateInterval.start();
        }}
        onPause={() => {
          console.log("pause");
          ProgrssUpdateInterval.stop();
        }}
        onStop={() => {
          console.log("stop");
          ProgrssUpdateInterval.stop();
        }}
        onEnd={() => {
          console.log("end");
          ProgrssUpdateInterval.stop();
        }}
        onLoad={() => {
          setPlayerState((player) => {
            player.loaded = true;
            player.duration = PlayerRef.current?.duration() ?? 0;
          });
        }}
        onLoadError={(id, err) => {
          console.log(id, err);
          notifications.show({
            title: "Error",
            message: "An error occured while loading the song.",
            color: "red",
          });
        }}
        onPlayError={(id, err) => {
          console.log(id, err);
          notifications.show({
            title: "Error",
            message: "An error occured while playing the song.",
            color: "red",
          });
        }}
      />
      <Group justify="space-between" h="100%" px="xl" grow>
        <Group>
          <Avatar src={CurrentTrack?.image} alt="goat" size={50} radius="sm" />

          <Stack gap={5}>
            <Text size="xs" fw="bold" maw={200} truncate="end">
              {CurrentTrack?.title}
            </Text>
            <Text size="10px" c="gray.6" maw={200} truncate="end">
              {CurrentTrack?.artist}
            </Text>
          </Stack>

          <ActionIcon
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            size={18}
            onClick={ () => {
              if (!CurrentTrack) return;

              try {
                 LikeApi.mutate({
                  songId: CurrentTrack?.id,
                });

                setIsLiked((prevIsLiked) => !prevIsLiked);
              } catch (error) {
                console.error("Error occurred while liking the song:", error);
              }
            }}
          >
            {isLiked ? <IconHeartFilled /> : <IconHeart />}
          </ActionIcon>
        </Group>

        <Stack gap={7} w="100%">
          <Group justify="center">
            <ActionIcon
              variant="transparent"
              onClick={() => {
                setPlayerState((player) => {
                  player.shuffle = !player.shuffle;
                });
              }}
              disabled={!PlayerState.loaded}
              color={PlayerState.shuffle ? "#ff6b6b" : "#fff"}
            >
              <IconArrowsShuffle size={18} />
            </ActionIcon>

            <ActionIcon variant="transparent" disabled={!PlayerState.loaded}>
              <IconPlayerTrackPrevFilled size={20} />
            </ActionIcon>

            <ActionIcon
              variant="transparent"
              disabled={!PlayerState.loaded}
              onClick={() => {
                setPlayerState((player) => {
                  player.playing = !player.playing;
                });
              }}
              color={PlayerState.playing ? "#ff6b6b" : "#fff"}
            >
              {PlayerState.playing ? (
                <IconPlayerPauseFilled />
              ) : (
                <IconPlayerPlayFilled />
              )}
            </ActionIcon>

            <ActionIcon variant="transparent" disabled={!PlayerState.loaded}>
              <IconPlayerTrackNextFilled size={20} />
            </ActionIcon>

            <ActionIcon
              disabled={!PlayerState.loaded}
              variant="transparent"
              onClick={() => {
                switch (PlayerState.repeat) {
                  case "none":
                    setPlayerState((player) => {
                      player.repeat = "one";
                    });
                    break;

                  case "one":
                    setPlayerState((player) => {
                      player.repeat = "all";
                    });
                    break;

                  case "all":
                    setPlayerState((player) => {
                      player.repeat = "none";
                    });
                    break;
                }
              }}
              color={PlayerState.repeat !== "none" ? "#ff6b6b" : "#fff"}
            >
              {PlayerState.repeat === "none" ? (
                <IconRepeatOff size={18} />
              ) : PlayerState.repeat === "one" ? (
                <IconRepeatOnce size={18} />
              ) : (
                <IconRepeat size={18} />
              )}
            </ActionIcon>
          </Group>

          <Flex gap="xs" align="center">
            <Text size="xs" c="gray.6">
              {new Date(PlayerState.progress * 1000)
                .toISOString()
                .substr(14, 5)}
            </Text>
            <Slider
              disabled={!PlayerState.loaded}
              w="100%"
              size="xs"
              color="gray.0"
              showLabelOnHover={false}
              defaultValue={0}
              thumbSize={10}
              min={0}
              max={PlayerState.duration}
              value={PlayerState.progress}
              onChange={(value) => {
                if (PlayerRef.current) {
                  PlayerRef.current.seek(value);

                  InternalProgressUpdate();
                }
              }}
            />
            <Text size="xs" c="gray.6">
              {new Date(PlayerState.duration * 1000)
                .toISOString()
                .substr(14, 5)}
            </Text>
          </Flex>
        </Stack>

        <Group justify="end">
          <ActionIcon
            variant="transparent"
            onClick={() => {
              setPlayerState((player) => {
                player.mute = !player.mute;
              });
            }}
          >
            {PlayerState.mute || PlayerState.volume === 0 ? (
              <IconVolumeOff size={18} />
            ) : (
              <IconVolume size={18} />
            )}
          </ActionIcon>
          <Slider
            miw={100}
            min={0}
            step={0.01}
            max={1}
            size="xs"
            color="gray.0"
            showLabelOnHover={false}
            value={PlayerState.mute ? 0 : PlayerState.volume}
            onChange={(value) => {
              setPlayerState((player) => {
                if (value === 0) {
                  player.mute = true;
                } else {
                  player.mute = false;
                  player.volume = value;
                }
              });
            }}
            thumbSize={10}
          />
        </Group>
      </Group>
    </>
  );
};
