import { CollectionConfig } from "payload";
import slugify from "slugify";

const BaseConfig: Pick<CollectionConfig, "fields" | "hooks" | "admin"> = {
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      admin: {
        disabled: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data) {
          data.slug = slugify(data.name, {
            lower: true,
            strict: true,
          });
        }
        return data;
      },
    ],
  },
  admin: {
    useAsTitle: "name",
  },
};

export const extendedConfig = (config: CollectionConfig) => {
  return {
    ...config,
    fields: [...BaseConfig.fields, ...config.fields],
    hooks: {
      ...BaseConfig.hooks,
      ...config.hooks,
    },
    admin: {
      ...BaseConfig.admin,
      ...config.admin,
    },
  };
};

export const ParentCategories = extendedConfig({
  slug: "parent-categories",
  fields: [
    { name: "color", type: "text" },
    {
      hasMany: true,
      type: "relationship",
      name: "subCategories",
      relationTo: "sub-categories",
    },
  ],
});

export const SubCategories = extendedConfig({
  slug: "sub-categories",
  fields: [],
});
