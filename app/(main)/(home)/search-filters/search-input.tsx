"use client";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CategoriesSidebar } from "./categories-sidebar";
import { Button } from "@/components/ui/button";

interface Props {
  disabled: boolean;
}

export function SearchInput({ disabled }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 size-5" />
        <Input
          className="p-8 pl-10 border"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>

      <Button
        variant={"elevated"}
        className="size-12 p-8 shrink-0 w-16 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon className="size-5" />
      </Button>
      {/* TODO: Add library button */}
    </div>
  );
}
