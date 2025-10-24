import { SignInView } from "@/modules/auth/ui/sign-in-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function SigInPage() {
  const session = await caller.auth.getSession();
  if (session.user) {
    redirect("/");
  }

  return <SignInView />;
}
