"use client";

import { signOut } from "next-auth/react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";
import { LogOut } from "lucide-react";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-between space-x-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src=""></AvatarImage>
            <AvatarFallback>
              {session.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Item variant="muted" className="flex flex-nowrap">
            <ItemTitle className="text-xs sm:text-sm">
              {session.user?.name}
            </ItemTitle>
            <ItemDescription className="text-xs sm:text-sm">
              {session.user?.email}
            </ItemDescription>
          </Item>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="icon"
            onClick={() => signOut({ callbackUrl: "/" })}
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
