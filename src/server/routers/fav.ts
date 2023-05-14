/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../prisma';

/**
 * Default selector for Fav.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.FavSelect>()({
  id: true,
  title: true,
});

export const postRouter = router({
  list: publicProcedure
    .query(async () => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const items = await prisma.fav.findMany({
        select: defaultPostSelect,
      });

      return {
        items: items,
      };
    }),
  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1).max(100),
      }),
    )
    .mutation(async ({ input }) => {
      const fav = await prisma.fav.create({
        data: input,
        select: defaultPostSelect,
      });
      return fav;
    }),
  remove: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
      }),
    )
    .mutation(async ({ input }) => {
      const fav = await prisma.fav.delete({
        where: input,
        select: defaultPostSelect,
      });
      return fav;
    }),
});
