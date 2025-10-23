import config from "@payload-config";
import { getPayload } from "payload";
import slugify from "slugify";

const categories = [
  {
    name: "All Videos",
    color: "#FFB347",
  },
  {
    name: "Nature & Landscapes",
    color: "#7EC8E3",
    subCategories: [
      "Mountains",
      "Forests",
      "Beaches",
      "Sunsets & Sunrises",
      "Wildlife",
    ],
  },
  {
    name: "Urban & City Life",
    color: "#FF9AA2",
    subCategories: [
      "Street Scenes",
      "Architecture",
      "Aerial Views",
      "City Traffic",
    ],
  },
  {
    name: "Business & Corporate",
    color: "#FFE066",
    subCategories: [
      "Office Environments",
      "Work Meetings",
      "Teamwork",
      "Technology & Innovation",
    ],
  },
  {
    name: "Lifestyle & People",
    color: "#96E6B3",
    subCategories: ["Family", "Friends", "Fitness & Sports", "Travel"],
  },
  {
    name: "Technology & Innovation",
    color: "#B5B9FF",
    subCategories: [
      "Robotics",
      "Artificial Intelligence",
      "Gadgets",
      "Computer Science",
    ],
  },
  {
    name: "Food & Drink",
    color: "#FFD700",
    subCategories: [
      "Cooking & Recipes",
      "Food Preparation",
      "Restaurants & Dining",
      "Beverages",
    ],
  },
  {
    name: "Health & Wellness",
    color: "#D8B5FF",
    subCategories: [
      "Medical & Healthcare",
      "Mental Health",
      "Exercise & Fitness",
      "Healthy Living",
    ],
  },
  {
    name: "Music & Sound",
    color: "#FF6B6B",
    subCategories: [
      "Instruments",
      "Sound Effects",
      "Music Videos",
      "Concerts & Festivals",
    ],
  },
  {
    name: "Abstract & Art",
    color: "#FFCAB0",
    subCategories: [
      "Abstract Motion",
      "Artistic Backgrounds",
      "Color & Texture",
    ],
  },
  {
    name: "Miscellaneous",
    color: "#E1E1E1",
  },
];

const seed = async function () {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const subCategories = [];
    for await (const subCategory of category.subCategories ?? []) {
      subCategories.push(
        await payload.create({
          collection: "sub-categories",
          data: {
            name: subCategory,
            slug: slugify(subCategory),
          },
        }),
      );
    }

    const parentCategory = await payload.create({
      collection: "parent-categories",
      data: {
        name: category.name,
        slug: slugify(category.name),
        color: category.color,
        subCategories: subCategories.map((subCategory) => subCategory.id),
      },
    });

    console.log(
      `Created ${parentCategory.name} with ${subCategories.length} items.`,
    );
  }
};

seed().then(() => process.exit(0));
