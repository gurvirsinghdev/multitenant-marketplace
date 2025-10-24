import { getQueryClient, trpc } from "@/trpc/server";
import { Footer } from "./footer";
import "./globals.css";
import { Navbar } from "./navbar";
import { SearchFilters, SearchFiltersLoading } from "./search-filters";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: Readonly<Props>) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getCategories.queryOptions());

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </main>
  );
}
