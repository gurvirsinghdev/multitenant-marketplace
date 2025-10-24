"use client";

import { ListFilterIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { CategoriesSidebar } from "./categories-sidebar";
import { CategoryDropdown } from "./category-dropdown";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function Categories() {
  const trpc = useTRPC();
  const getCategoriesQuery = useSuspenseQuery(
    trpc.categories.getCategories.queryOptions(),
  );
  const categories = getCategoriesQuery.data ?? [];

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(categories.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = categories[0].slug;
  const activeCategoryIndex = categories.findIndex(
    (category) => category.slug === activeCategory,
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(function () {
    if (!containerRef.current || !measureRef.current || !viewAllRef.current)
      return;

    const calculateVisibility = () => {
      const containerWidth = containerRef.current!.offsetWidth;
      const viewAllWidth = viewAllRef.current!.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current!.children);
      let totalWidth = 0;
      let visibility = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visibility++;
      }

      setVisibleCount(visibility);
    };

    const resizeObserver = new ResizeObserver(calculateVisibility);
    resizeObserver.observe(containerRef.current!);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* Used to compute visibility */}
      <div
        ref={measureRef}
        className="flex absolte opacity-0 pointer-events-non"
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
        }}
      >
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      {/* Visible to the user */}
      <div
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        ref={containerRef}
        className="flex flex-nowrap items-center"
      >
        {categories.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}

        <div ref={viewAllRef} className="shrink-0">
          <Button
            variant={"elevated"}
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary border-2 text-black",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-white border-primary",
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            <span>View More</span>
            <ListFilterIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
