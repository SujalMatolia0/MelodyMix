import { protectedProcedure } from "../../trpc";
import { WorldZod } from "~/lib/zod";

export const TrackListRouter = protectedProcedure
  .input(WorldZod.Pagination)
  .query(async ({ input, ctx }) => {
    const TrackPromise = ctx.db.song.findMany({
      select: {
        id: true,
        artist: true,
        type: true,
        title: true,
        source: true,
        length: true,
        image: true,
      },

      skip: (input.page - 1) * input.limit,
      take: input.limit,
    });

    const countPromise = ctx.db.song.count();

    const [tracks, count] = await ctx.db.$transaction([
      TrackPromise,
      countPromise,
    ]);

    return {
      tracks: tracks,
      page: input.page,
      limit: input.limit,
      total: count,
      totalPages: Math.ceil(count / input.limit),
    };
  });
