"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  sortingOptions,
  useProductFilters,
} from "../../hooks/use-product-filters";

export default function ProductSort() {
  const [filters, setFilters] = useProductFilters();

  const keyMap: Map<string, string> = new Map([["and", "&"]]);
  const generateSortingLabel = (sortingMode: string) => {
    const words = sortingMode.split("_");
    const formattedWords = words.map((word) =>
      keyMap.has(word.toLowerCase())
        ? keyMap.get(word.toLowerCase())
        : word.toLowerCase(),
    );

    return formattedWords.join(" ");
  };

  return (
    <div className="flex items-center gap-2">
      {sortingOptions.map((sortingMode) => (
        <Button
          key={sortingMode}
          size={"sm"}
          className={cn(
            "rounded-full border-2 cursor-pointer bg-white hover:bg-white capitalize",
            filters.sorting !== sortingMode &&
              "bg-transparent border-transparent hover:border-border hover:bg-transparent",
          )}
          variant={"secondary"}
          onClick={() => setFilters({ ...filters, sorting: sortingMode })}
        >
          {generateSortingLabel(sortingMode)}
        </Button>
      ))}
    </div>
  );
}
