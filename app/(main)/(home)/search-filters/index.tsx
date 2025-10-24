import { Categories } from "./categories";
import { SearchInput } from "./search-input";

export function SearchFilters() {
  return (
    <div
      style={{ backgroundColor: "#F5F5F5" }}
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
    >
      <SearchInput disabled={false} />

      <div className="hidden lg:block">
        <Categories />
      </div>
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
