import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Footer } from "./footer";
import "./globals.css";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";

interface Props {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: Readonly<Props>) {
  const payload = await getPayload({
    config: configPromise,
  });
  const categories = await payload.find({
    pagination: false,
    collection: "parent-categories",
    sort: "createdAt",
  });

  const formattedData = categories.docs.map((doc) => ({
    ...doc,
    subCategories: doc.subCategories ? doc.subCategories : [],
  }));

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters categories={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </main>
  );
}
