import { SubCategories } from "@/collections/Categories";
import { ParentCategory } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export const productsRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(z.object({ categorySlug: z.string(), isParent: z.boolean() }))
    .query(async ({ ctx, input }) => {
      try {
        let potentialSlugs: string[] = [input.categorySlug];

        if (input.isParent) {
          const {
            docs: [parentCategory],
          } = await ctx.payload.find({
            limit: 1,
            depth: 1,
            collection: "parent-categories",
            where: {
              slug: { equals: input.categorySlug },
            },
          });

          if (parentCategory.subCategories)
            potentialSlugs = [
              ...potentialSlugs,
              ...parentCategory.subCategories
                .filter((category) => typeof category !== "string")
                .map((category) => category.slug),
            ];
        }
        const data = await ctx.payload.find({
          depth: 1,
          collection: "products",
          where: {
            "categories.slug": { in: potentialSlugs },
          },
        });

        return data;
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
