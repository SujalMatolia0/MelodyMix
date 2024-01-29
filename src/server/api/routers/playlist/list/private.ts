import { WorldZod } from "~/lib/zod";
import { protectedProcedure } from "~/server/api/trpc";

export const playlistListPrivateRoute = protectedProcedure
  .input(WorldZod.Pagination)
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const dataPromise = ctx.db.playlist.findMany({
      skip: (input.page - 1) * input.limit,
      take: input.limit,
      where: {
        CreatorId: userId,
        public: false,
      },

      select: {
        CreatorId: true,
        id: true,
        image: true,
        title: true,
        songsCount: true,
      },
    });

    const countPromise = ctx.db.playlist.count();

    const [data, count] = await ctx.db.$transaction([
      dataPromise,
      countPromise,
    ]);

    return {
      playlists: data,
      page: input.page,
      limit: input.limit,
      total: count,
      totalPages: Math.ceil(count / input.limit),
    };
  });
