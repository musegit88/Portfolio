"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Home, LogOut } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";

const Header = ({ session, avatar }: { session: Session; avatar?: string }) => {
  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-between space-x-2">
        <Button variant="outline" size="icon" asChild title="home">
          <Link href="/">
            <Home />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={avatar}></AvatarImage>
              <AvatarFallback>
                {session.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Item variant="muted" className="hidden sm:flex flex-nowrap">
              <ItemTitle className="text-xs sm:text-sm">
                {session.user?.name}
              </ItemTitle>
              <ItemDescription className="text-xs sm:text-sm">
                {session.user?.email}
              </ItemDescription>
            </Item>
          </div>
          <Button
            title="Logout"
            variant="destructive"
            size="icon"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
