import { AuthCookies } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies, headers } from "next/headers";
import * as z from "zod";
import { registerSchema, loginSchema } from "./schema";

export const authRouter = createTRPCRouter({
  getSession: baseProcedure.query(async ({ ctx }) => {
    const nextHeaders = await headers();
    const session = await ctx.payload.auth({ headers: nextHeaders });
    return session;
  }),

  logout: baseProcedure.mutation(async () => {
    const nextCookies = await cookies();
    nextCookies.delete(AuthCookies);
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

      const nextCookies = await cookies();
      nextCookies.set({
        name: AuthCookies,
        value: data.token,
        httpOnly: true,
        path: "/",
      });
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    console.log(input);
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

    const nextCookies = await cookies();
    nextCookies.set({
      name: AuthCookies,
      value: data.token,
      httpOnly: true,
      path: "/",
    });
  }),
});
