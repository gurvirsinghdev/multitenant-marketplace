import { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", unique: true, required: true },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
  admin: {
    useAsTitle: "name",
  },
};
