import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import * as z from "zod";
import { sortingOptions } from "../hooks/use-product-filters";
import { Product } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(
      z.object({
        categorySlug: z.string(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sorting: z.enum(sortingOptions).nullable().optional(),
        isParent: z.boolean(),
      }),
    )
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

          if (parentCategory?.subCategories)
            potentialSlugs = [
              ...potentialSlugs,
              ...parentCategory.subCategories
                .filter((category) => typeof category !== "string")
                .map((category) => category.slug),
            ];
        }

        const priceFilter = {
          ...(input.minPrice && {
            greater_than_equal: input.minPrice,
          }),
          ...(input.maxPrice && {
            less_than_equal: input.maxPrice,
          }),
        };

        const orderMap: Map<
          (typeof sortingOptions)[number],
          `-${keyof Product}` | `+${keyof Product}`
        > = new Map([
          ["curated", "-createdAt"],
          ["trending", "+createdAt"],
          ["how_and_new", "-createdAt"],
        ]);

        const data = await ctx.payload.find({
          depth: 1,
          collection: "products",
          where: {
            "categories.slug": { in: potentialSlugs },
            ...(Object.keys(priceFilter).length > 0 && {
              price: priceFilter,
            }),
            ...(input.tags &&
              input.tags?.length > 0 && {
                "tags.name": {
                  in: input.tags,
                },
              }),
          },
          ...(input.sorting && { sort: orderMap.get(input.sorting) }),
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
