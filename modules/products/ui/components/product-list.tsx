"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useProductFilters } from "../../hooks/use-product-filters";

export function ProductList() {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { category, subcategory } = useParams();
  const isParentCategory = subcategory ? false : true;

  const getProductsQuery = useSuspenseQuery(
    trpc.products.getProducts.queryOptions({
      ...filters,
      isParent: isParentCategory,
      categorySlug: isParentCategory
        ? (category as string)
        : (subcategory as string),
    }),
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {getProductsQuery.data.docs.map((product) => (
        <div key={product.id} className="border rounded-md bg-white">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <span>{product.price}</span>
        </div>
      ))}
    </div>
  );
}

export function ProductListSkeleton() {
  return <p>Loading...</p>;
}
