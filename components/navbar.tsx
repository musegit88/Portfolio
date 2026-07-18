import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { FaGithub } from "react-icons/fa";
import { UserCog2 } from "lucide-react";

import { Setting } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const Navbar = ({
  user,
  settings,
}: {
  user?: Session["user"];
  settings?: Setting;
}) => {
  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-white/80 dark:bg-black/10 backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center justify-between p-4">
          <Link href="/">
            {settings?.logoUrl && settings.logoUrl.startsWith("textlogo:") ? (
              (() => {
                try {
                  const config = JSON.parse(
                    settings.logoUrl.replace("textlogo:", ""),
                  );
                  return (
                    <div
                      className={cn(
                        "flex items-center gap-1 font-bold text-lg tracking-tight",
                        config.font,
                      )}
                    >
                      {config.badge === "none" ? (
                        <span>{config.text}</span>
                      ) : config.badge === "boxed" ? (
                        <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md text-sm">
                          {config.text}
                        </span>
                      ) : (
                        <span className="bg-linear-to-r from-violet-600 to-indigo-600 text-white px-2 py-1 rounded-md text-sm">
                          {config.text}
                        </span>
                      )}
                    </div>
                  );
                } catch (e) {
                  return <span className="font-bold">Portfolio</span>;
                }
              })()
            ) : settings?.logoUrl ? (
              <div className="relative w-36 h-10">
                <Image
                  src={settings.logoUrl}
                  alt="Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            ) : (
              <div className="dark:bg-white bg-black border dark:text-black text-white p-2 font-semibold rounded-md">
                Portfolio
              </div>
            )}
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
