import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getCategories: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "parent-categories",
      pagination: false,
      sort: "createdAt",
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subCategories: (doc.subCategories ? doc.subCategories : []).filter(
        (category) => typeof category !== "string",
      ),
    }));

    return formattedData;
  }),
});
