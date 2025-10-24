"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const getSessionQuery = useQuery(trpc.auth.getSession.queryOptions());

  return <p>{JSON.stringify(getSessionQuery.data)}</p>;
}
