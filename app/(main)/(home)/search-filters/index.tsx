import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface Props {
  categories: unknown;
}

export function SearchFilters(props: Props) {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput disabled={false} categories={props.categories} />

      <div className="hidden lg:block">
        <Categories categories={props.categories} />
      </div>
    </div>
  );
}
