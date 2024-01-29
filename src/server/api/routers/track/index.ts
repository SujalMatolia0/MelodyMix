import { createTRPCRouter } from "../../trpc";
import { TrackGetRouter } from "./get";
import { TrackListRouter } from "./list";
import { TrackNewRouter } from "./new";
import { TrackSearchRouter } from "./search";

export const trackRouter = createTRPCRouter({
  new: TrackNewRouter,
  get: TrackGetRouter,
  list: TrackListRouter,
  search: TrackSearchRouter,
});
