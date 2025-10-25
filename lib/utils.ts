import { Category } from "@/interfaces";
import { clsx, type ClassValue } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFakedCategory(
  data: Pick<Category, "name" | "slug" | "color">,
): Category {
  const slug = slugify(data.slug, {
    lower: true,
    strict: true,
  });

  return {
    id: slug,
    slug,
    subCategories: [],
    color: data.color,
    createdAt: new Date().toString(),
    name: data.name,
    updatedAt: new Date().toString(),
  };
}
