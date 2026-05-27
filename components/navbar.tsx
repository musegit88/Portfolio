import Link from "next/link";
import { Session } from "next-auth";
import { FaGithub } from "react-icons/fa";
import { UserCog2 } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const Navbar = ({ user }: { user?: Session["user"] }) => {
  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-white/80 dark:bg-black/10 backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center justify-between p-4">
          <Link href={"/"} className="flex items-center">
            <div className="bg-black border rounded-tl-md rounded-bl-md text-white p-2 font-semibold">
              M4
            </div>
            <div className="border rounded-tr-md rounded-br-md p-2  font-semibold shadow-md">
              Dev
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <Button variant="outline" size="icon" asChild>
                <Link href="/admin/dashboard">
                  <UserCog2 />
                </Link>
              </Button>
            )}
            <a href="https://github.com/musegit88" target="_blank">
              <FaGithub size={20} />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
