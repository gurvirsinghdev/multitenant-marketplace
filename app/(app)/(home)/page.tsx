import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });
  const categories = await payload.find({
    collection: "categories",
  });

  return (
    <code>{JSON.stringify(categories, null, 2)}</code>
  );
}
