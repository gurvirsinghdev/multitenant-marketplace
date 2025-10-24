import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      type: "text",
      name: "username",
      unique: true,
      required: true,
    },
  ],
};
