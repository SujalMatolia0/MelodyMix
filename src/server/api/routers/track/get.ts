import { TrackZod } from "~/lib/zod/track";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const TrackGetRouter = protectedProcedure
  .input(TrackZod.$Id)
  .mutation(async ({ input, ctx }) => {
    const track = await ctx.db.song.findUnique({
      where: {
        id: input,
      },

      select: {
        id: true,
        artist: true,
        image: true,
        PlaylistId: true,
        source: true,
        title: true,
      },
    });

    if (!track) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Track not found",
      });
    }

    return track;
  });
