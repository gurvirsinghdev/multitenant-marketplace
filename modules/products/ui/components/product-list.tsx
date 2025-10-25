"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function ProductList() {
  const trpc = useTRPC();
  const { category, subcategory } = useParams();
  const isParentCategory = subcategory ? false : true;

  const getProductsQuery = useSuspenseQuery(
    trpc.products.getProducts.queryOptions({
      isParent: isParentCategory,
      categorySlug: isParentCategory
        ? (category as string)
        : (subcategory as string),
    }),
  );

  return JSON.stringify(getProductsQuery.data, null, 2);
}

export function ProductListSkeleton() {
  return <p>Loading...</p>;
}
