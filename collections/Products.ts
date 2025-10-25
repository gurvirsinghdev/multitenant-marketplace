import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "sub-categories",
      required: true,
      hasMany: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["7 Days", "No Refunds"],
      defaultValue: "7 Days",
      required: true,
    },
  ],
  admin: {
    useAsTitle: "name",
  },
};
