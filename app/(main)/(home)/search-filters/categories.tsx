import { CategoryDropdown } from "./category-dropdown";

interface Props {
  categories: unknown
}

export function Categories({ categories }: Props) {
  console.log(categories);

  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>

        ))}
      </div>
    </div>
  )
}

