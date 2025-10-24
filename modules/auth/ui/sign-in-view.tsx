"use client";

import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "../server/schema";
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

type FormSchema = typeof loginSchema;
export function SignInView() {
  const trpc = useTRPC();
  const router = useRouter();
  const loginMutation = useMutation(
    trpc.auth.login.mutationOptions({
      onMutate() {
        toast.loading("Logging in!", { id: "login" });
      },
      onError(err) {
        toast.error(err.message, { id: "login" });
      },
      onSuccess() {
        toast.success("Logged In!", { id: "login" });
        router.push("/");
      },
    }),
  );

  const form = useForm<z.infer<FormSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<FormSchema>) => {
    loginMutation.mutate(values);
  };

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
                <Link prefetch href={"/sign-up"}>
                  Sign up
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl font-medium">Welcome back to VididPro.</h1>
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
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <Loader2Icon className="animate-spin size-4" />
              ) : (
                <span>Log in</span>
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
