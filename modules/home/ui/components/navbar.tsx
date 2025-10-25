"use client";

import { MenuIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { NavbarSidebar } from "./navbar-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const poppinsFontFamily = Poppins({
  weight: "700",
  subsets: ["latin"],
});

interface NavbarItemProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}
export type NavbarItemRaw = Omit<NavbarItemProps, "isActive">;

export const NavbarItem = function ({
  href,
  isActive,
  children,
}: NavbarItemProps) {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent border-2 px-3.5 text-lg ",
        isActive && "bg-black text-white hover:bg-black hover:text-white",
      )}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};
const navbarItemsRaw: NavbarItemRaw[] = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = function () {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const trpc = useTRPC();
  const getSessionQuery = useQuery(trpc.auth.getSession.queryOptions());

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      {/* Application Logo */}
      <Link href="/" className="pl-6 flex items-center">
        <span
          className={cn("text-5xl font-semibold", poppinsFontFamily.className)}
        >
          vididpro
        </span>
      </Link>

      {/* Mobile Navigation */}
      <NavbarSidebar
        items={navbarItemsRaw}
        onOpenChange={setMobileOpen}
        open={mobileOpen}
      />

      {/* Navigation Items */}
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItemsRaw.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {/* Auth/Action Buttons */}
      <div className="hidden lg:flex">
        {getSessionQuery.data ? (
          <Button
            variant={"secondary"}
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg cursor-pointer"
            asChild
          >
            <Link href={"/admin"}>Dashboard</Link>
          </Button>
        ) : (
          <>
            <Button
              variant={"secondary"}
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg cursor-pointer"
              asChild
            >
              <Link prefetch href={"/sign-in"}>
                Login in
              </Link>
            </Button>
            <Button
              variant={"secondary"}
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg cursor-pointer"
              asChild
            >
              <Link prefetch href={"/sign-up"}>
                Start selling
              </Link>
            </Button>
          </>
        )}
      </div>

      <div className="flex lg:hidden items-center justify-center pr-6">
        <Button
          asChild
          size={"icon-lg"}
          variant={"ghost"}
          onClick={() => setMobileOpen(true)}
          className="border-transparent bg-white"
        >
          <MenuIcon className="size-8!" />
        </Button>
      </div>
    </nav>
  );
};
