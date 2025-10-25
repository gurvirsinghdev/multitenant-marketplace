"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";

interface ProductFiltersProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}
const ProductFilter = (props: ProductFiltersProps) => {
  const [open, setOpen] = useState(false);
  const Icon = open ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", props.className)}>
      <div
        className="flex items-center justify-between cusror-pointer"
        onClick={() => setOpen((c) => !c)}
      >
        <p className="font-medium">{props.title}</p>
        <Icon className="size-5" />
      </div>
      {open && props.children}
    </div>
  );
};

export function ProductFilters() {
  const [filters, setFilters] = useProductFilters();

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        <button className="underine" onClick={() => {}}>
          Clear
        </button>
      </div>
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
}
