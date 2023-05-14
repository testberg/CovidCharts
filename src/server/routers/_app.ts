/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";
import { postRouter } from "./fav";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),

  fav: postRouter,
});

export type AppRouter = typeof appRouter;
