"use client";
import { useParams } from "next/navigation";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export function SearchFilters() {
  const params = useParams();
  const activeCategorySlug = (params.category as string) || "";
  const activeSubCategorySlug = params.subcategory as string | undefined;

  const trpc = useTRPC();
  const getCategoriesQuery = useSuspenseQuery(
    trpc.categories.getCategories.queryOptions(),
  );

  const activeCategory = (getCategoriesQuery.data ?? []).find(
    (category) => category.slug === activeCategorySlug,
  );
  const activeCategoryName = activeCategory?.name;
  const activeCategoryColor = activeCategory?.color || "#F5F5F5";

  const activeSubCategory = activeCategory?.subCategories?.find(
    (subCategory) => subCategory.slug === activeSubCategorySlug,
  );
  const activeSubCategoryName = activeSubCategory?.name;

  return (
    <div
      style={{ backgroundColor: activeCategoryColor }}
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
    >
      <SearchInput disabled={false} />

      <div className="hidden lg:block">
        <Categories />
      </div>
      <BreadcrumbNavigation
        activeCategorySlug={activeCategorySlug}
        activeCategoryName={activeCategoryName}
        activeSubCategoryName={activeSubCategoryName}
      />
    </div>
  );
}

export function SearchFiltersLoading() {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-12"></div>
      </div>
    </div>
  );
}

interface BreadcrumbNavigationProps {
  activeCategoryName?: string | null;
  activeCategorySlug?: string | null;
  activeSubCategoryName?: string | null;
}

function BreadcrumbNavigation({
  activeCategoryName,
  activeCategorySlug,
  activeSubCategoryName,
}: BreadcrumbNavigationProps) {
  if (!activeCategoryName || !activeCategorySlug) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubCategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-xl font-medium underline text-primary"
              >
                <Link href={`/${activeCategorySlug}`}>
                  {activeCategoryName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary font-medium text-lg">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {activeSubCategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium">
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
