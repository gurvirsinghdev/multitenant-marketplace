"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";
import TagsFilter from "./tags-filter";

interface ProductFiltersProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}
const ProductFilter = (props: ProductFiltersProps) => {
  const [open, setOpen] = useState(false);
  const Icon = open ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("border-b flex flex-col gap-2", props.className)}>
      <div
        className="flex p-4 items-center justify-between cursor-pointer"
        onClick={() => setOpen((c) => !c)}
      >
        <p className="font-medium">{props.title}</p>
        <Icon className="size-5" />
      </div>
      {open && <div className="p-4 pt-0">{props.children}</div>}
    </div>
  );
};

export function ProductFilters() {
  const [filters, setFilters] = useProductFilters();

  const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "sorting") return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value !== "";

    return value !== null;
  });

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  const onClear = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      tags: [],
    });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        {hasAnyFilters && (
          <button className="underline cursor-pointer" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <ProductFilter title="Price">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
      <ProductFilter title="Tags" className="border-b-0">
        <TagsFilter
          value={filters.tags}
          onChange={(value) => onChange("tags", value)}
        />
      </ProductFilter>
    </div>
  );
}
