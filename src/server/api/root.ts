import { createTRPCRouter } from '~/server/api/trpc';
import { playlistRouter } from './routers/playlist';
import { trackRouter } from './routers/track';
import { UserInfoRouter } from './routers/profile';
import { LikedPlaylistRouter } from './routers/liked/likedSongs';
import { LikeSongRouter } from './routers/liked/likePlaylist';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  track: trackRouter,
  playlist: playlistRouter,
  user: UserInfoRouter,
  like: LikedPlaylistRouter,
  likeList: LikeSongRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
