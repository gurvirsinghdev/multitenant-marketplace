"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "./query-client";
import { useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { AppRouter } from "./routers/_app";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let browserQueryClient: QueryClient;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function getUrl() {
  const getBaseUrl = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return "https://" + process.env.VERCEL_URL;
    return process.env.NEXT_PUBLIC_BASE_URL;
  })();
  return getBaseUrl + "/api/trpc";
}

export function TRPCReactProvider(
  props: Readonly<{ children: React.ReactNode }>,
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
