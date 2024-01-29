import { TrackZod } from "~/lib/zod/track";
import { protectedProcedure } from "../../trpc";
import { error } from "console";


export const LikedPlaylistRouter = protectedProcedure.
input(TrackZod.Like)
  .mutation(async ({ input, ctx }) => {
    const SessionUserId = ctx.session.user.id

    const songexist = await ctx.db.song.findUnique({
      where: { id: input.songId },
    })
    if(!songexist){
      throw error("no track found")
    }
    await ctx.db.user.update({
      where: { id:  SessionUserId},
      data: {
        Like: {
          connect:{
            id: input.songId,
          }
        }
      }
    });

  });
