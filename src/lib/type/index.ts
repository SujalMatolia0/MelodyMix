import { type RouterOutputs } from "~/utils/api";

export type TrackObj = RouterOutputs["track"]["list"]["tracks"][0];
export type PlatlistObj = RouterOutputs["playlist"]["list"]["public"]["playlists"][0];
export type LikedObj = RouterOutputs["likeList"]["tracks"][0]

export type PlayerStateObj = {
  playing: boolean;
  volume: number;
  progress: number;
  repeat: "none" | "one" | "all";
  shuffle: boolean;
  mute: boolean;
  duration: number;
  loaded: boolean;
};
