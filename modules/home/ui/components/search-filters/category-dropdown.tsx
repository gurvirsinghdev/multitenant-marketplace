"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SubCategoryMenu } from "./subcategory-menu";
import { useDropdownPosition } from "./use-dropdown-position";
import Link from "next/link";
import { Category } from "@/interfaces";

interface Props {
  isActive: boolean;
  isNavigationHovered: boolean;
  category: Category;
}

export function CategoryDropdown({
  category,
  isActive,
  isNavigationHovered,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const dropdownPosition = getDropdownPosition();

  const onMouseEnter = () => {
    if (category.subCategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (category.subCategories?.length) {
      setIsOpen((o) => !o);
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={toggleDropdown}
    >
      <div className="relative">
        <Button
          variant={"elevated"}
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary border-2 text-black",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen && "bg-white border-primary",
          )}
        >
          <Link
            href={`/${category.slug === "/all-videos" ? "/" : category.slug}`}
          >
            {category.name}
          </Link>
        </Button>

        {category.subCategories && category.subCategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-10 border-r-10 border-b-10 border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100",
            )}
          />
        )}
      </div>

      <SubCategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
}
