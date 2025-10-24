import { categoriesRouter } from "@/modules/categories/procedures";
import { createTRPCRouter } from "../init";
import { authRouter } from "@/modules/auth/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
