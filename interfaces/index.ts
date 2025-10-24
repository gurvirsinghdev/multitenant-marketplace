import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouteInput = inferRouterInputs<AppRouter>;
export type RouteOutput = inferRouterOutputs<AppRouter>;

export type Categories = RouteOutput["categories"]["getCategories"];
export type Category = Categories[number];

export type SubCategories =
  Categories[number]["subCategories"][number] extends string
    ? never
    : Categories[number]["subCategories"];
export type SubCategory = SubCategories[number];
