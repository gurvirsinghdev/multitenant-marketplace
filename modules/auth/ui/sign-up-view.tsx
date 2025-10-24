"use client";

import { useForm } from "react-hook-form";
import { registerSchema } from "../server/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

type FormSchema = typeof registerSchema;
export function SignUpView() {
  const trpc = useTRPC();
  const router = useRouter();
  const registerMutation = useMutation(
    trpc.auth.register.mutationOptions({
      onMutate() {
        toast.loading("Creating your account!", { id: "create-account" });
      },
      onError(err) {
        toast.error(err.message, { id: "create-account" });
      },
      onSuccess() {
        toast.success("Logged In!", { id: "create-account" });
        router.push("/");
      },
    }),
  );

  const form = useForm<z.infer<FormSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<FormSchema>) => {
    registerMutation.mutate(values);
  };

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            className="flex flex-col gap-8 p-4 lg:p-16"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center justify-between mb-8">
              <Link href={"/"}>
                <span className={cn("text-2xl font-semibold")}>vididpro</span>
              </Link>

              <Button
                asChild
                variant={"ghost"}
                size="sm"
                className="text-base border-none underline"
              >
                <Link prefetch href={"/sign-in"}>
                  Sign in
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl font-medium">
              Join over 1,520 creators earning on vididpro.
            </h1>
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={cn("hidden", true && "block")}>
                    Your store will be available at&nbsp;
                    <strong>
                      {username}.
                      {new URL(process.env.NEXT_PUBLIC_BASE_URL!).host}
                    </strong>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="lg"
              type="submit"
              variant={"elevated"}
              className="bg-black text-white hover:bg-pink-400 hover:text-primary"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <Loader2Icon className="animate-spin size-4" />
              ) : (
                <span>Create Account</span>
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: "url('/images/auth-background.jpg')",
        }}
      />
    </div>
  );
}
