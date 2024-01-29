import { protectedProcedure } from "../trpc";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export const UserInfoRouter = protectedProcedure.query(async ({ ctx }) => {
  const currentUser = ctx.session.user;

  const { name, email, image } = await ctx.db.user.findUnique({
    where: {
      id: currentUser.id,
    },
  }) as User;

  return {
    name,
    email,
    image,
  };
});
