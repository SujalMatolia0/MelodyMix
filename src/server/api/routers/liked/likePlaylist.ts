import { WorldZod } from "~/lib/zod";
import { protectedProcedure } from "../../trpc";

export const LikeSongRouter = protectedProcedure
  .input(WorldZod.Pagination)
  .query(async ({ input, ctx }) => {
    try {
      const SessionUserId = ctx.session.user.id;

      const { page, limit } = input;

      const [tracks, count] = await Promise.all([
        ctx.db.song.findMany({
          where: {
            Like: {
              some: {
                id: SessionUserId,
              },
            },
          },

          select: {
            artist: true,
            id: true,
            title: true,
            image: true,
            type: true,
            source: true,
            length: true,
          }
        }),
        ctx.db.song.count({
          where: {
            Like: {
              some: {
                id: SessionUserId,
              },
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(count / limit);

      return {
        tracks,
        page,
        limit,
        total: count,
        totalPages,
      };
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      throw new Error("Failed to fetch liked songs");
    }
  });
