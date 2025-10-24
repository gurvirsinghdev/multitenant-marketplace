import { initTRPC } from "@trpc/server";
import { getPayload } from "payload";
import { cache } from "react";
import config from "@payload-config";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  return {};
});
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ next, ctx }) => {
  const payload = await getPayload({ config });
  return next({
    ctx: {
      ...ctx,
      payload,
    },
  });
});
