import { useQueryStates } from "nuqs";
import {
  parseAsString,
  parseAsArrayOf,
  createLoader,
  parseAsStringLiteral,
} from "nuqs/server";

export const sortingOptions = ["curated", "trending", "how_and_new"] as const;

export const filterParams = {
  minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: true })
    .withDefault([]),
  sorting: parseAsStringLiteral(sortingOptions).withDefault("curated"),
};

export const useProductFilters = () => {
  return useQueryStates(filterParams);
};

export const loadProductFilters = createLoader(filterParams);
