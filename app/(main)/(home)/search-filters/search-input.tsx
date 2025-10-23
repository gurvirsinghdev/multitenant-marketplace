import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Props {
  disabled: boolean
}

export function SearchInput({ disabled }: Props) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 size-5" />
        <Input className="p-8 pl-10" placeholder="Search products" disabled={disabled} />
      </div>
      {/* TODO: Add categories */}
      {/* TODO: Add library button */}
    </div>
  );
}
