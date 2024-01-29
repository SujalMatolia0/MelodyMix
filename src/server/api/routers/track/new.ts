import { TrackZod } from "~/lib/zod/track";
import { protectedProcedure } from "../../trpc";

export const TrackNewRouter = protectedProcedure
  .input(TrackZod.New)
  .mutation(async ({ input, ctx }) => {
    await ctx.db.song.create({
      data: {
        title: input.title,
        artist: input.artist,
        image: input.image,
        source: input.source,
        length: input.length,
        type: input.type,
      },
    });
  });
