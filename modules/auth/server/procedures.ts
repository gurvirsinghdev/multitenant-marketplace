import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { registerSchema, loginSchema } from "./schema";
import { generateAuthCookie } from "../utils/generate-auth-cookies";

export const authRouter = createTRPCRouter({
  getSession: baseProcedure.query(async ({ ctx }) => {
    const nextHeaders = await headers();
    const session = await ctx.payload.auth({ headers: nextHeaders });
    return session;
  }),

  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      const existingUser = await ctx.payload.find({
        collection: "users",
        limit: 1,
        where: {
          username: { equals: input.username },
        },
      });

      if (existingUser.docs[0]) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username is already taken!",
        });
      }

      await ctx.payload.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      });

      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login manually.",
        });
      }

      await generateAuthCookie({
        prefix: ctx.payload.config.cookiePrefix,
        value: data.token,
      });
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.payload.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login.",
      });
    }

    await generateAuthCookie({
      prefix: ctx.payload.config.cookiePrefix,
      value: data.token,
    });
  }),
});
