import { type PlayerStateObj, type PlatlistObj, type TrackObj, type LikedObj } from "../type";
import { atomWithToggle } from "./hooks/atomWithToggle";
import { atomWithImmer } from "jotai-immer";
import { atom } from "jotai";

export const NavbarAtom = atomWithToggle(false);

export const CurrentTrackAtom = atom<TrackObj | null>(null);
export const CurrentPlaylistAtom = atom<PlatlistObj | null>(null);
export const userAtom = atom({
  id: null,
  name: null,
});

export const LikedTrackAtom = atom<LikedObj | null>(null);

export const PlayerAtom = atomWithImmer<PlayerStateObj>({
  playing: false,
  volume: 0.1,
  progress: 0,
  repeat: "none",
  shuffle: false,
  mute: false,
  duration: 0,
  loaded: false,
});
