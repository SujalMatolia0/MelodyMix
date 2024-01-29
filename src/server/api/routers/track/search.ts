import { TrackZod } from "~/lib/zod/track";
import { protectedProcedure } from "../../trpc";

export const TrackSearchRouter = protectedProcedure
  .input(TrackZod.$Title)
  .query(async ({ input, ctx }) => {
    const track = await ctx.db.song.findMany({
      where: {
        OR: [
          {
            title: {
              contains: input,
            },
          },
          {
            artist: {
              contains: input,
            },
          },
        ],
      },

      select: {
        artist: true,
        type: true,
        title: true,
        source: true,
        length: true,
        image: true,
      },

      take: 10,
    });

    return {
      tracks: track,
      total: track.length,
    };
  });
