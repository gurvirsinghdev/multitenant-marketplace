import { SignUpView } from "@/modules/auth/ui/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function SigUpPage() {
  const session = await caller.auth.getSession();
  if (session.user) {
    redirect("/");
  }

  return <SignUpView />;
}
