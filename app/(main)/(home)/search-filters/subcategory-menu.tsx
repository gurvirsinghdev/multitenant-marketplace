import Link from "next/link";

import { ParentCategory } from "@/payload-types";

interface Props {
  category: ParentCategory;
  isOpen: boolean;
  position: { top: number; left: number };
}

export function SubCategoryMenu(props: Props) {
  if (
    !props.isOpen ||
    !props.category.subCategories ||
    props.category.subCategories.length == 0
  ) {
    return null;
  }

  const backgroundColor = props.category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-100"
      style={{
        left: props.position.left,
        top: props.position.top,
      }}
    >
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {props.category.subCategories.map((subcategory) => (
            <Link
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
              href={`/${props.category.slug}/${subcategory.slug}`}
              key={subcategory.slug}
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
